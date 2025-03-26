package com.example.lettering.controller.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class UserMypageResponse {
    private String nickname;
    private String font;
    private List<KeyringInfoResponse> keyrings;
}
