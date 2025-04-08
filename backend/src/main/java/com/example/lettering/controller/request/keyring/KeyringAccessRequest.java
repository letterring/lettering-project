package com.example.lettering.controller.request.keyring;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class KeyringAccessRequest {
    @NotNull(message = "id 필수입니다.")
    private Long id;
    @NotNull(message = "deviceId 필수입니다.")
    private String deviceId;
}
