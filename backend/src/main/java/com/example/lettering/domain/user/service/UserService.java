package com.example.lettering.domain.user.service;

import com.example.lettering.controller.request.SignUpRequest;
import com.example.lettering.controller.response.UserMypageResponse;
import com.example.lettering.domain.user.entity.User;
import com.example.lettering.domain.user.enums.Font;

public interface UserService {
    void addUser(SignUpRequest signUpRequestDto);
    void validateDuplicateUserInfo(SignUpRequest signUpRequestDto);
    boolean isLocalUser(String email);
    User getUserById(Long id);
    UserMypageResponse getMypageInfo(Long userId);
    void updateNickname(Long userId, String newNickname);
    void updateFont(Long userId, Font newFont);
}
