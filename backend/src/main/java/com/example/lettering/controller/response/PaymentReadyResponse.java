package com.example.lettering.controller.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PaymentReadyResponse {
    private Long orderNumber;
    private String paymentUrl;
}
