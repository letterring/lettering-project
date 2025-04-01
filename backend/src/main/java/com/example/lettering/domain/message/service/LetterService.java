package com.example.lettering.domain.message.service;


import com.example.lettering.controller.request.sender.CreateLetterRequest;
import com.example.lettering.controller.response.dear.LetterToDearDetailResponse;
import com.example.lettering.controller.response.sender.LetterBySenderDetailResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface LetterService {

    Long createLetter(CreateLetterRequest request, List<MultipartFile> imageFiles, Long senderId) throws IOException;

    LetterBySenderDetailResponse getLetterBySenderDetail(Long messageId);

    LetterToDearDetailResponse getLetterToDearDetail(Long messageId);
}