package com.example.lettering.controller.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class UpdateNfcNameRequest {
    @NotBlank(message = "받는 사람의 이름(NFC 이름)은 필수입니다.")
    private String nfcName;
}