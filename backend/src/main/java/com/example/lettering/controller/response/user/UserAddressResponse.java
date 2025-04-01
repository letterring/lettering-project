package com.example.lettering.controller.response.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserAddressResponse {
    private String realName;
    private String phoneNumber;
    private String email;
    private String zipcode;
    private String roadAddress;
    private String detailAddress;
}
