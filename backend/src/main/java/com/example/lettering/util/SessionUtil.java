package com.example.lettering.util;

import com.example.lettering.domain.keyring.service.KeyringSessionService;
import com.example.lettering.exception.ExceptionCode;
import com.example.lettering.exception.type.BusinessException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SessionUtil {

    private final KeyringSessionService sessionService;

    public Long extractValidKeyringId(String authHeader, HttpServletRequest request) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new BusinessException(ExceptionCode.UNAUTHORIZED_ACCESS);
        }

        String sessionToken = authHeader.replace("Bearer ", "");
        String ip = request.getRemoteAddr();
        String ua = request.getHeader("User-Agent");

        Long keyringId = sessionService.getKeyringIdIfValid(sessionToken, ip, ua);
        if (keyringId == null) {
            throw new BusinessException(ExceptionCode.UNAUTHORIZED_ACCESS);
        }

        return keyringId;
    }
}
