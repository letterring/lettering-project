package com.example.lettering.domain.keyring.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.Instant;

@Getter
@AllArgsConstructor
public class TokenInfo {
    private String mac;
    private Long keyringId;
    private String ip;
    private String ua;
    private Instant expiresAt;
}
