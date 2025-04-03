package com.example.lettering.domain.keyring.service;

public interface KeyringAuthService {
    boolean isTextValid(Long keyringId, String text);
}
