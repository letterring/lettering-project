package com.example.lettering.domain.message.service;

import com.example.lettering.controller.request.sender.CreatePostcardRequest;
import com.example.lettering.controller.response.sender.PostcardBySenderDetailResponse;
import com.example.lettering.controller.response.dear.PostcardToDearDetailResponse;
import com.example.lettering.domain.keyring.entity.Keyring;
import com.example.lettering.domain.keyring.repository.KeyringRepository;
import com.example.lettering.domain.message.entity.Postcard;
import com.example.lettering.domain.message.repository.PostcardRepository;
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

@Service
@RequiredArgsConstructor
@Transactional
public class PostcardServiceImpl implements PostcardService {

    private final PostcardRepository postcardRepository;
    private final S3ImageUtil s3ImageUtil;
    private final UserRepository userRepository;
    private final KeyringRepository keyringRepository;
    private final SealingWaxRepository sealingWaxRepository;
    private final AESUtil aesUtil;

    @Override
    public Long createPostcard(CreatePostcardRequest createPostcardRequest, MultipartFile imageFile, Long senderId) throws IOException {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new BusinessException(ExceptionCode.USER_NOT_FOUND));

        Keyring keyring = keyringRepository.findById(createPostcardRequest.getKeyringId())
                .orElseThrow(() -> new BusinessException(ExceptionCode.KEYRING_NOT_FOUND));

        SealingWax sealingWax = sealingWaxRepository.findById(createPostcardRequest.getSealingWaxId())
                .orElseThrow(() -> new BusinessException(ExceptionCode.SEALINGWAX_NOT_FOUND));

        if (sealingWax.getContentCount() != 1){
            throw new BusinessException(ExceptionCode.INVALID_MESSAGE_CONTENT_COUNT);
        }

        String imageHighUrl = s3ImageUtil.uploadHighQualityImage(imageFile, "postcard_images");

        String imageLowUrl = s3ImageUtil.uploadLowQualityImage(imageFile, "postcard_images");

        String encryptedContent = aesUtil.encrypt(createPostcardRequest.getContent());

        Postcard postcard = Postcard.fromDto(createPostcardRequest, sender, keyring, sealingWax, imageHighUrl, imageLowUrl, sender.getFont(), encryptedContent);

        return postcardRepository.save(postcard).getId();
    }

    @Override
    @Transactional
    public PostcardBySenderDetailResponse getPostcardDetail(Long messageId) {
        Postcard postcard = postcardRepository.findById(messageId)
                .orElseThrow(() -> new BusinessException(ExceptionCode.MESSAGE_NOT_FOUND));

        String decryptedContent = aesUtil.decrypt(postcard.getContent());

        PostcardBySenderDetailResponse response = PostcardBySenderDetailResponse.fromEntity(postcard);
        response.setContent(decryptedContent);

        return response;
    }

    @Override
    public PostcardToDearDetailResponse getPostcardToDearDetail(Long messageId) {
        Postcard postcard = postcardRepository.findById(messageId)
                .orElseThrow(() -> new BusinessException(ExceptionCode.MESSAGE_NOT_FOUND));

        postcard.markAsOpened();

        String decryptedContent = aesUtil.decrypt(postcard.getContent());

        PostcardToDearDetailResponse response = PostcardToDearDetailResponse.fromEntity(postcard);
        response.setContent(decryptedContent);

        return response;
    }

    @Override
    public byte[] downloadImageFromS3(String imageUrl) {
        return s3ImageUtil.downloadImageBytes(imageUrl);
    }

    @Override
    public void resetMessageAsUnread(Long messageId) {
        Postcard postcard = postcardRepository.findById(messageId)
                .orElseThrow(() -> new BusinessException(ExceptionCode.DATABASE_ERROR));
        
        postcard.resetAsUnread();
    }
}
