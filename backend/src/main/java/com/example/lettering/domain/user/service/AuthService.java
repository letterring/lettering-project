package com.example.lettering.domain.user.service;

import com.example.lettering.controller.request.LoginRequestDto;
import com.example.lettering.controller.response.LoginResponseDto;
import com.example.lettering.domain.user.entity.User;
import jakarta.mail.AuthenticationFailedException;

public interface AuthService {
    LoginResponseDto loginUser(LoginRequestDto loginRequestDto) throws AuthenticationFailedException;
    LoginResponseDto createResponseDto(User user);
}
