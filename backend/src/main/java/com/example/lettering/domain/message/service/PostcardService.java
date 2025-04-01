package com.example.lettering.domain.message.service;

import com.example.lettering.controller.request.sender.CreatePostcardRequest;
import com.example.lettering.controller.response.sender.PostcardBySenderDetailResponse;
import com.example.lettering.controller.response.dear.PostcardToDearDetailResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface PostcardService {
    Long createPostcard(CreatePostcardRequest request, MultipartFile imageFile, Long senderId) throws IOException;

    PostcardBySenderDetailResponse getPostcardDetail(Long messageId);

    PostcardToDearDetailResponse getPostcardToDearDetail(Long messageId);

    void resetMessageAsUnread(Long messageId);
}
