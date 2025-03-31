package com.example.lettering.domain.message.service;


import com.example.lettering.controller.request.CreateLetterRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface LetterService {

    Long createLetter(CreateLetterRequest request, List<MultipartFile> imageFiles, Long senderId) throws IOException;

}