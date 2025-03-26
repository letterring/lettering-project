package com.example.lettering.domain.user.service;

import com.example.lettering.controller.request.LoginRequest;
import com.example.lettering.controller.response.LoginResponse;
import com.example.lettering.domain.user.entity.User;
import jakarta.mail.AuthenticationFailedException;

public interface AuthService {
    LoginResponse loginUser(LoginRequest loginRequestDto);
    LoginResponse createResponseDto(User user);
}
