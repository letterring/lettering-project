package com.example.lettering.controller.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class UpdateNfcNameRequest {
    @NotBlank(message = "키링 이름은 필수입니다.")
    private String nfcName;
}