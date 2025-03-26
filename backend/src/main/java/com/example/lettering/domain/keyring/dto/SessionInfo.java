package com.example.lettering.domain.keyring.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.Instant;

@Getter
@AllArgsConstructor
public class SessionInfo {
    public Long keyringId;
    public String ip;
    public String userAgent;
    public Instant expiresAt;
}
