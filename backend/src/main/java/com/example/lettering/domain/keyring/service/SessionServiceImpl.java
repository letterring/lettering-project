package com.example.lettering.domain.keyring.service;


import com.example.lettering.domain.keyring.dto.SessionInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class SessionServiceImpl implements SessionService{
    private final Map<String, SessionInfo> sessions = new ConcurrentHashMap<>();

    @Override
    public String issueSession(Long keyringId, String ip, String ua) {
        String sessionToken = UUID.randomUUID().toString();

        // ⛔ expiresAt 제거!
        sessions.put(sessionToken, new SessionInfo(keyringId, ip, ua, null));
        return sessionToken;
    }

    @Override
    public boolean isValid(String sessionToken, Long keyringId, String ip, String ua) {
        SessionInfo info = sessions.get(sessionToken);
        if (info == null) return false;

        return info.keyringId.equals(keyringId) &&
                info.ip.equals(ip) &&
                info.userAgent.equals(ua);
    }
}

