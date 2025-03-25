package com.example.lettering.domain.message.service;

import com.example.lettering.controller.request.CreatePostcardRequest;
import com.example.lettering.controller.response.PostcardDetailResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface PostcardService {
    Long createPostcard(CreatePostcardRequest request, MultipartFile imageFile, Long senderId) throws IOException;

    PostcardDetailResponse getPostcardDetail(Long messageId);
}
