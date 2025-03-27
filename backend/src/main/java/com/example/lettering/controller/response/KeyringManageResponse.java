package com.example.lettering.controller.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class KeyringManageResponse {
    private Long keyringId;
    private String nfcName;
    private boolean isFavorite;
    private String tagCode;
    private String imageUrl;
    private LocalDateTime lastSentTime;
}