package com.example.lettering.domain.keyring.service;

public interface SessionService {
    String issueSession(Long keyringId, String ip, String ua);
    boolean isValid(String sessionToken, Long keyringId, String ip, String ua);
}
