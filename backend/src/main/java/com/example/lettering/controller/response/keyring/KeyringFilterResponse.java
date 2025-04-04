package com.example.lettering.controller.response.keyring;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class KeyringFilterResponse {
    private Long keyringId;
    private String nfcName;
}