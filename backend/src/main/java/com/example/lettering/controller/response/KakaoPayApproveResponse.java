package com.example.lettering.controller.response;

import com.example.lettering.external.kakao.pay.dto.Amount;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class KakaoPayApproveResponse {
    private String aid;
    private String tid;
    private String cid;
    private String sid;
    private String partner_order_id;
    private String partner_user_id;
    private String payment_method_type;
    private Amount amount;
}
