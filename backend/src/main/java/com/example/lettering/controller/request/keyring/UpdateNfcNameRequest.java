package com.example.lettering.controller.request.keyring;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class UpdateNfcNameRequest {
    @NotBlank(message = "받는 사람의 이름(NFC 이름)은 필수입니다.")
    @Size(min = 1, max = 5, message = "이름은 1~5자 제한입니다.")
    private String nfcName;
}