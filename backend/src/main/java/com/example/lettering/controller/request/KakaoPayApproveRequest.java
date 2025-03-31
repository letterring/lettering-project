package com.example.lettering.controller.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class KakaoPayApproveRequest {
    private String tid;
    private String partnerOrderId;
    private String partnerUserId;
    private String pgToken;
}
