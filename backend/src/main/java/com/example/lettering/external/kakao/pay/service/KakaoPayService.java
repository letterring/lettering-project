package com.example.lettering.external.kakao.pay.service;


import com.example.lettering.controller.request.user.KakaoPayApproveRequest;
import com.example.lettering.controller.request.user.KakaoPayReadyRequest;
import com.example.lettering.controller.response.user.KakaoPayApproveResponse;
import com.example.lettering.controller.response.user.KakaoPayReadyResponse;
import reactor.core.publisher.Mono;

public interface KakaoPayService {
    Mono<KakaoPayReadyResponse> ready(KakaoPayReadyRequest request);
    Mono<KakaoPayApproveResponse> approve(KakaoPayApproveRequest request);
}
