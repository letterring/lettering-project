package com.example.lettering.controller.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class KeyringManageResponse {
    private Long keyringId;
    private String nfcName;
    private boolean isFavorite;
}