package com.example.lettering.domain.user.service;

import com.example.lettering.controller.request.user.LoginRequest;
import com.example.lettering.controller.response.user.LoginResponse;
import com.example.lettering.domain.user.entity.User;

public interface AuthService {
    LoginResponse loginUser(LoginRequest loginRequestDto);
    LoginResponse createResponseDto(User user);
}
