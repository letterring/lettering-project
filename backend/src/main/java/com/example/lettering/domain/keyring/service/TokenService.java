package com.example.lettering.domain.keyring.service;

public interface TokenService {
    String generateToken();
    String generateMac(String token);
    void storeToken(String token, String mac, Long keyringId, String ip, String ua);
    boolean isValid(String token, String mac, Long keyringId, String ip, String ua);
}
