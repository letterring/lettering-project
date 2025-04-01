package com.example.lettering.domain.message.service;

import com.example.lettering.controller.request.sender.CreateLetterRequest;
import com.example.lettering.controller.response.sender.LetterBySenderDetailResponse;
import com.example.lettering.controller.response.sender.PostcardDetailResponse;
import com.example.lettering.domain.keyring.entity.Keyring;
import com.example.lettering.domain.keyring.repository.KeyringRepository;
import com.example.lettering.domain.message.entity.Letter;
import com.example.lettering.domain.message.entity.LetterContent;
import com.example.lettering.domain.message.entity.LetterImage;
import com.example.lettering.domain.message.entity.Postcard;
import com.example.lettering.domain.message.repository.LetterRepository;
import com.example.lettering.domain.sealingwax.entity.SealingWax;
import com.example.lettering.domain.sealingwax.repository.SealingWaxRepository;
import com.example.lettering.domain.user.entity.User;
import com.example.lettering.domain.user.repository.UserRepository;
import com.example.lettering.exception.ExceptionCode;
import com.example.lettering.exception.type.BusinessException;
import com.example.lettering.util.S3ImageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class LetterServiceImpl implements LetterService {

    private final LetterRepository letterRepository;
    private final UserRepository userRepository; // sender 조회시 사용
    private final S3ImageUtil s3ImageUtil;
    private final KeyringRepository keyringRepository;
    private final SealingWaxRepository sealingWaxRepository;

    @Override
    public Long createLetter(CreateLetterRequest createLetterRequest, List<MultipartFile> imageFiles, Long senderId) throws IOException {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new BusinessException(ExceptionCode.USER_NOT_FOUND));

        Keyring keyring = keyringRepository.findById(createLetterRequest.getKeyringId())
                .orElseThrow(() -> new BusinessException(ExceptionCode.KEYRING_NOT_FOUND));

        SealingWax sealingWax = sealingWaxRepository.findById(createLetterRequest.getSealingWaxId())
                .orElseThrow(() -> new BusinessException(ExceptionCode.SEALINGWAX_NOT_FOUND));

        List<LetterContent> contents = new ArrayList<>();
        if (createLetterRequest.getContents() != null) {
            for (String contentText : createLetterRequest.getContents()) {
                contents.add(LetterContent.fromText(contentText));
            }
        }

        List<LetterImage> images = new ArrayList<>();
        int orderIndex = 0;
        for (MultipartFile imageFile : imageFiles) {
            String imageHighUrl = s3ImageUtil.uploadHighQualityImage(imageFile, "letter_images");
            String imageLowUrl = s3ImageUtil.uploadLowQualityImage(imageFile, "letter_images");
            images.add(LetterImage.fromImageUrl(imageHighUrl, imageLowUrl, orderIndex));
            orderIndex++;
        }

        Letter letter = Letter.fromDto(createLetterRequest, sender, keyring, sealingWax, sender.getFont(), contents, images);

        return letterRepository.save(letter).getId();
    }

    @Override
    public LetterBySenderDetailResponse getLetterBySenderDetail(Long messageId) {
        Letter letter = letterRepository.findById(messageId)
                .orElseThrow(() -> new BusinessException(ExceptionCode.MESSAGE_NOT_FOUND));

        return LetterBySenderDetailResponse.fromEntity(letter);
    }
}
