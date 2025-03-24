package com.example.lettering.domain.postcard.service;

import com.example.lettering.controller.request.CreatePostcardRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface PostcardService {
    Long createPostcard(CreatePostcardRequest request, MultipartFile imageFile) throws IOException;
}
