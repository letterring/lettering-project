package com.example.lettering.controller.reuqest;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderRequest {
    private String realName;       // ✅ 주문자 이름
    private String phoneNumber;    // ✅ 주문자 전화번호
    private String email;          // ✅ 주문자 이메일
    private String roadAddress;    // ✅ 배송지 (도로명 주소)
    private String detailAddress;  // ✅ 배송지 (상세 주소)
    private Long keyringDesignId;  // ✅ 구매할 키링 디자인 ID
    private int quantity;          // ✅ 구매할 개수
}
