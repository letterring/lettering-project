package com.example.lettering.external.kakao.pay.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class Amount {
    private int total;
    private int tax_free;
    private int vat;
    private int point;
    private int discount;
}