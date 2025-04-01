package com.example.lettering.domain.sealingwax.service;

import com.example.lettering.controller.request.sender.CreateSealingWaxRequest;
import com.example.lettering.controller.response.sender.SealingWaxResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface SealingWaxService {
    SealingWaxResponse createSealingWax(CreateSealingWaxRequest request, MultipartFile imageFile) throws IOException;
    List<SealingWaxResponse> getAllSealingWaxes();
}
