package com.example.lettering.domain.keyring.service;

import com.example.lettering.domain.keyring.dto.TokenInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.time.Instant;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService{

    @Value("${token.secret}")
    private String secret;

    private static final Map<String, TokenInfo> tokenStore = new ConcurrentHashMap<>();

    @Override
    public String generateToken() {
        return UUID.randomUUID().toString();
    }

    @Override
    public String generateMac(String token) {
        try {
            Mac hmac = Mac.getInstance("HmacSHA256");
            hmac.init(new SecretKeySpec(secret.getBytes(), "HmacSHA256"));
            byte[] result = hmac.doFinal(token.getBytes());
            return Base64.getUrlEncoder().withoutPadding().encodeToString(result);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void storeToken(String token, String mac, Long keyringId, String ip, String ua) {
        TokenInfo info = new TokenInfo(
                mac,
                keyringId,
                ip,
                ua,
                Instant.now().plusSeconds(10) // 10초 유효
        );
        tokenStore.put(token, info);
    }

    @Override
    public boolean isValid(String token, String mac, Long keyringId, String ip, String ua) {
        TokenInfo info = tokenStore.get(token);
        if (info == null) return false;

        if (Instant.now().isAfter(info.getExpiresAt())) {
            tokenStore.remove(token); // ⏰ 만료되면 삭제
            return false;
        }

        boolean match =
                info.getMac().equals(mac) &&
                        info.getKeyringId().equals(keyringId) &&
                        info.getIp().equals(ip) &&
                        info.getUa().equals(ua);

        if (match) {
            tokenStore.remove(token); // ✅ 1회용 처리: 성공하면 제거
        }

        return match;
    }


}
