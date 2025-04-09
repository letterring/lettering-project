package com.example.lettering.controller.response.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PaymentReadyResponse {
    private Long orderNumber;
    private String pcUrl;
    private String mobileUrl;
}
