package com.example.lettering.domain.keyring.service;

public interface KeyringSessionService {
    String issueSession(Long keyringId, String ip, String ua);
    Long getKeyringIdIfValid(String sessionToken, String ip, String ua);
}
