package com.example.lettering.controller.response.user;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class KakaoPayReadyResponse {
    private String tid;
    private String next_redirect_pc_url;
    private String created_at;
}
