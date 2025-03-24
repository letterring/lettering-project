package com.example.lettering.domain.user.service;

import com.example.lettering.controller.request.SignUpRequestDto;

public interface UserService {
    void addUser(SignUpRequestDto signUpRequestDto);
    void validateSignUpDto(SignUpRequestDto signUpRequestDto);
    boolean isLocalUser(String email);
}
