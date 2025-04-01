package com.example.lettering.controller.response.keyring;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class KeyringInfoResponse {
    private Long keyringId;
    private String keyringName;
    private boolean isFavorite;
    private String tagCode;
    private String imageUrl;
    private LocalDateTime lastSentTime;
    private int totalMessageCount;
    private int scheduledCount;
    private int timeCapsuleCount;
    private int secretCount;
}
