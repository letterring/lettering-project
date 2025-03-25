package com.example.lettering.domain.user.service;

import com.example.lettering.controller.request.SignUpRequest;
import com.example.lettering.domain.user.entity.User;

public interface UserService {
    void addUser(SignUpRequest signUpRequestDto);
    void validateDuplicateUserInfo(SignUpRequest signUpRequestDto);
    boolean isLocalUser(String email);
    User getUserById(Long id);
}
