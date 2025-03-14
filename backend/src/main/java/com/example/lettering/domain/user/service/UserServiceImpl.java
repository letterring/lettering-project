//package com.example.lettering.domain.user.service;
//
//import com.example.lettering.controller.response.UserListResponse;
//import com.example.lettering.controller.response.UserResponse;
//import com.example.lettering.domain.user.entity.User;
//import com.example.lettering.domain.user.repository.UserCustomRepository;
//import com.example.lettering.domain.user.repository.UserRepository;
//import com.example.lettering.exception.ExceptionCode;
//import com.example.lettering.exception.type.DbException;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//@Slf4j
//public class UserServiceImpl implements UserService {
//
//    private final UserRepository userRepository;
//    private final UserCustomRepository userCustomRepository;
//
//    @Override
//    public UserResponse getUserById(int id) {
//
//        User user = userCustomRepository.findById(id)
//                .orElseThrow(() -> new DbException(ExceptionCode.USER_NOT_FOUND));
//
//        return UserResponse.of(user.getEmail(), user.getName());
//    }
//
//    @Override
//    public UserListResponse getAllUsers() {
//
//        List<User> userList = userRepository.findAll();
//
//        return UserListResponse.of(userList);
//    }
//
//    @Override
//    public void deleteUserById(int id) {
//        userRepository.deleteById(id);
//    }
//}
