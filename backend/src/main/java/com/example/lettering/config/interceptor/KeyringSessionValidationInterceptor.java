package com.example.lettering.config.interceptor;

import com.example.lettering.domain.keyring.service.KeyringService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@RequiredArgsConstructor
public class KeyringSessionValidationInterceptor implements HandlerInterceptor {

    private final KeyringService keyringService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("keyringId") == null) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Keyring 정보가 없습니다.");
            return false;
        }

        Long keyringId = (Long) session.getAttribute("keyringId");
        if (!keyringService.isValidKeyring(keyringId)) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "유효하지 않은 키링입니다.");
            return false;
        }

        return true;
    }
}
