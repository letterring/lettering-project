package com.example.lettering.external.kakao.pay.service;


import com.example.lettering.controller.request.KakaoPayApproveRequest;
import com.example.lettering.controller.request.KakaoPayReadyRequest;
import com.example.lettering.controller.response.KakaoPayApproveResponse;
import com.example.lettering.controller.response.KakaoPayReadyResponse;
import reactor.core.publisher.Mono;

public interface KakaoPayService {
    Mono<KakaoPayReadyResponse> ready(KakaoPayReadyRequest request);
    Mono<KakaoPayApproveResponse> approve(KakaoPayApproveRequest request);
}
