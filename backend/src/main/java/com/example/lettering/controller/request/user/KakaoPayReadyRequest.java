package com.example.lettering.controller.request.user;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class KakaoPayReadyRequest {
    private String partnerOrderId;
    private String partnerUserId;
    private String itemName;
    private int quantity;
    private int totalAmount;
}