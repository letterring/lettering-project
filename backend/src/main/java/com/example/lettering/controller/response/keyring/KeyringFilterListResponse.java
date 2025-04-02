package com.example.lettering.controller.response.keyring;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class KeyringFilterListResponse {
    private List<KeyringFilterResponse> keyringFilterResponse;

    public static KeyringFilterListResponse of(List<KeyringFilterResponse> keyringFilterResponseList) {
        return new KeyringFilterListResponse(keyringFilterResponseList);
    }
}
