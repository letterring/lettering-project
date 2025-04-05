package com.example.lettering.config;

import com.example.lettering.domain.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@RequiredArgsConstructor
public class SessionValidationInterceptor implements HandlerInterceptor {

    private final UserService userService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("userId") == null) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "로그인이 필요합니다.");
            return false;
        }
        Long userId = (Long) session.getAttribute("userId");
        // userId가 실제 유효한 사용자인지 추가 검증
        if (!userService.isValidUser(userId)) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "등록되지 않은 사용자입니다.");
            return false;
        }
        return true;
    }
}
