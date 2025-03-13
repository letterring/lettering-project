package com.example.lettering.domain.user.service;


import com.example.lettering.controller.response.UserListResponse;
import com.example.lettering.controller.response.UserResponse;

public interface UserService {

    UserResponse getUserById(int id);

    UserListResponse getAllUsers();

    void deleteUserById(int id);
}
