package com.example.lettering.domain.message.service;

import com.example.lettering.controller.request.sender.CreateLetterRequest;
import com.example.lettering.controller.response.dear.LetterToDearDetailResponse;
import com.example.lettering.controller.response.sender.LetterBySenderDetailResponse;
import com.example.lettering.domain.keyring.entity.Keyring;
import com.example.lettering.domain.keyring.repository.KeyringRepository;
import com.example.lettering.domain.message.entity.Letter;
import com.example.lettering.domain.message.entity.LetterContent;
import com.example.lettering.domain.message.entity.LetterImage;
import com.example.lettering.domain.message.repository.LetterRepository;
import com.example.lettering.domain.sealingwax.entity.SealingWax;
import com.example.lettering.domain.sealingwax.repository.SealingWaxRepository;
import com.example.lettering.domain.user.entity.User;
import com.example.lettering.domain.user.repository.UserRepository;
import com.example.lettering.exception.ExceptionCode;
import com.example.lettering.exception.type.BusinessException;
import com.example.lettering.util.AESUtil;
import com.example.lettering.util.S3ImageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class LetterServiceImpl implements LetterService {

    private final LetterRepository letterRepository;
    private final UserRepository userRepository;
    private final S3ImageUtil s3ImageUtil;
    private final KeyringRepository keyringRepository;
    private final SealingWaxRepository sealingWaxRepository;
    private final AESUtil aesUtil;

    @Override
    public Long createLetter(CreateLetterRequest createLetterRequest, List<MultipartFile> imageFiles, Long senderId) throws IOException {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new BusinessException(ExceptionCode.USER_NOT_FOUND));

        Keyring keyring = keyringRepository.findById(createLetterRequest.getKeyringId())
                .orElseThrow(() -> new BusinessException(ExceptionCode.KEYRING_NOT_FOUND));

        SealingWax sealingWax = sealingWaxRepository.findById(createLetterRequest.getSealingWaxId())
                .orElseThrow(() -> new BusinessException(ExceptionCode.SEALINGWAX_NOT_FOUND));

        if (createLetterRequest.getContents().size() != sealingWax.getContentCount()){
            throw new BusinessException(ExceptionCode.INVALID_MESSAGE_CONTENT_COUNT);
        }

        if (imageFiles.size() != sealingWax.getImageCount()) {
            throw new BusinessException(ExceptionCode.INVALID_MESSAGE_IMAGE_COUNT);
        }

        List<LetterContent> contents = new ArrayList<>();
        if (createLetterRequest.getContents() != null) {
            for (String contentText : createLetterRequest.getContents()) {
                String encryptedText = aesUtil.encrypt(contentText);
                contents.add(LetterContent.fromText(encryptedText));
            }
        }

        List<LetterImage> images = new ArrayList<>();
        List<CompletableFuture<String>> highFutures = new ArrayList<>();
        List<CompletableFuture<String>> lowFutures = new ArrayList<>();

        for (MultipartFile imageFile : imageFiles) {
            highFutures.add(s3ImageUtil.uploadHighQualityImageAsync(imageFile, "letter_images"));
            lowFutures.add(s3ImageUtil.uploadLowQualityImageAsync(imageFile, "letter_images"));
        }

        CompletableFuture.allOf(highFutures.toArray(new CompletableFuture[0])).join();
        CompletableFuture.allOf(lowFutures.toArray(new CompletableFuture[0])).join();

        for (int i = 0; i < imageFiles.size(); i++) {
            try {
                String highUrl = highFutures.get(i).get();
                String lowUrl = lowFutures.get(i).get();
                images.add(LetterImage.fromImageUrl(highUrl, lowUrl, i));

            } catch (ExecutionException e) {
                throw new BusinessException(ExceptionCode.S3_UPLOAD_ERROR);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                throw new BusinessException(ExceptionCode.S3_UPLOAD_ERROR);
            }
        }

        Letter letter = Letter.fromDto(createLetterRequest, sender, keyring, sealingWax, sender.getFont(), contents, images);

        return letterRepository.save(letter).getId();
    }

    @Override
    public LetterBySenderDetailResponse getLetterBySenderDetail(Long messageId) {
        Letter letter = letterRepository.findById(messageId)
                .orElseThrow(() -> new BusinessException(ExceptionCode.MESSAGE_NOT_FOUND));

        List<String> decryptedContents = letter.getContents().stream()
                .sorted(Comparator.comparing(LetterContent::getId))
                .map(c -> aesUtil.decrypt(c.getText()))
                .collect(Collectors.toList());

        LetterBySenderDetailResponse response = LetterBySenderDetailResponse.fromEntity(letter);
        response.setLetterContents(decryptedContents);

        return response;
    }

    @Override
    public LetterToDearDetailResponse getLetterToDearDetail(Long messageId) {
        Letter letter = letterRepository.findById(messageId)
                .orElseThrow(() -> new BusinessException(ExceptionCode.MESSAGE_NOT_FOUND));

        letter.markAsOpened();

        List<String> decryptedContents = letter.getContents().stream()
                .sorted(Comparator.comparing(LetterContent::getId))
                .map(c -> aesUtil.decrypt(c.getText()))
                .collect(Collectors.toList());

        LetterToDearDetailResponse response = LetterToDearDetailResponse.fromEntity(letter);
        response.setLetterContents(decryptedContents);

        return response;
    }
}
