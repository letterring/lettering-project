package com.example.lettering.controller.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class CreateSealingWaxRequest {
    private String sealingWaxName;
    private Integer imageCount;
    private MultipartFile imageFile;
}