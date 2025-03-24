package com.example.lettering.domain.postcard.service;

import com.example.lettering.controller.request.CreatePostcardRequest;
import com.example.lettering.domain.postcard.entity.Postcard;
import com.example.lettering.domain.postcard.repository.PostcardRepository;
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

    @Override
    public Long createPostcard(CreatePostcardRequest request, MultipartFile imageFile) throws IOException {
        String imageUrl = s3ImageUtil.uploadImage(imageFile, "postcard_images");

        // Postcard 엔티티 생성 (필요한 AbstractMessage 필드들은 실제 서비스 로직에 따라 추가)
        Postcard postcard = Postcard.builder()
                .content(request.getContent())
                .imageUrl(imageUrl)
                .build();

        // 엔티티 저장
        Postcard saved = postcardRepository.save(postcard);
        return saved.getId();
    }
}
