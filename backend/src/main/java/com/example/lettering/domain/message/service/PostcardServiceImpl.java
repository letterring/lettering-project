package com.example.lettering.domain.message.service;

import com.example.lettering.controller.request.CreatePostcardRequest;
import com.example.lettering.controller.response.PostcardDetailResponse;
import com.example.lettering.controller.response.PostcardToDearDetailResponse;
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

    @Override
    public Long createPostcard(CreatePostcardRequest createPostcardRequest, MultipartFile imageFile, Long senderId) throws IOException {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new BusinessException(ExceptionCode.USER_NOT_FOUND));

        Keyring keyring = keyringRepository.findById(createPostcardRequest.getKeyringId())
                .orElseThrow(() -> new BusinessException(ExceptionCode.KEYRING_NOT_FOUND));

        SealingWax sealingWax = sealingWaxRepository.findById(createPostcardRequest.getSealingWaxId())
                .orElseThrow(() -> new BusinessException(ExceptionCode.SEALINGWAX_NOT_FOUND));

        String imageUrl = s3ImageUtil.uploadImage(imageFile, "postcard_images");

        Postcard postcard = Postcard.fromDto(createPostcardRequest, sender, keyring, sealingWax, imageUrl, sender.getFont());

        return postcardRepository.save(postcard).getId();
    }

    @Override
    @Transactional
    public PostcardDetailResponse getPostcardDetail(Long messageId) {
        Postcard postcard = postcardRepository.findById(messageId)
                .orElseThrow(() -> new BusinessException(ExceptionCode.MESSAGE_NOT_FOUND));

        return PostcardDetailResponse.fromEntity(postcard);
    }

    @Override
    public PostcardToDearDetailResponse getPostcardToDearDetail(Long messageId) {
        Postcard postcard = postcardRepository.findById(messageId)
                .orElseThrow(() -> new BusinessException(ExceptionCode.MESSAGE_NOT_FOUND));

        postcard.markAsOpened();

        return PostcardToDearDetailResponse.fromEntity(postcard);
    }

    @Override
    public void resetMessageAsUnread(Long messageId) {
        Postcard postcard = postcardRepository.findById(messageId)
                .orElseThrow(() -> new BusinessException(ExceptionCode.DATABASE_ERROR));
        
        postcard.resetAsUnread();
    }
}
