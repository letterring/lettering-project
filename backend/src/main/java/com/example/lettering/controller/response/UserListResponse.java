//package com.example.lettering.controller.response;
//
//import com.example.lettering.domain.user.dto.UserDto;
//import com.example.lettering.domain.user.entity.User;
//import lombok.Builder;
//import lombok.Getter;
//
//import java.util.List;
//
//@Getter
//@Builder
//public class UserListResponse {
//
//    private List<UserDto> userDtoList;
//
//    public static UserListResponse of(List<User> users) {
//
//        List<UserDto> userResponses = users.stream()
//                .map(user -> UserDto.of(user.getEmail(), user.getName()))
//                .toList();
//
//        return UserListResponse.builder()
//                .userDtoList(userResponses)
//                .build();
//    }
//}
