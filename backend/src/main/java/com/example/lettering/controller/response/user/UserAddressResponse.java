package com.example.lettering.controller.response.user;

import com.example.lettering.domain.user.entity.User;
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

    public static UserAddressResponse fromEntity(User user) {
        return new UserAddressResponse(
                user.getRealName(),
                user.getPhoneNumber(),
                user.getEmail(),
                user.getZipcode(),
                user.getRoadAddress(),
                user.getDetailAddress()
        );
    }
}
