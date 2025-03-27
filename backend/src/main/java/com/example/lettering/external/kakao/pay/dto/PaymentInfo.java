package com.example.lettering.external.kakao.pay.dto;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class PaymentInfo {
    private String tid;
    private String status;
    private Amount amount;
}
