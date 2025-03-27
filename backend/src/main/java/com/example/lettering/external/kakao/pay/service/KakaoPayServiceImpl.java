package com.example.lettering.external.kakao.pay.service;


import com.example.lettering.controller.request.KakaoPayApproveRequest;
import com.example.lettering.controller.request.KakaoPayReadyRequest;
import com.example.lettering.controller.response.KakaoPayApproveResponse;
import com.example.lettering.controller.response.KakaoPayReadyResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.util.StringUtils.truncate;

@Service
@RequiredArgsConstructor
public class KakaoPayServiceImpl implements KakaoPayService {

    private final WebClient.Builder webClientBuilder;

    @Value("${kakaopay.secret-key}")
    private String secretKey;

    @Value("${kakaopay.api-url}")
    private String apiUrl;

    @Value("${kakaopay.cid}")
    private String cid;

    @Value("${kakaopay.approval-url}")
    private String approvalUrl;

    @Override
    public Mono<KakaoPayReadyResponse> ready(KakaoPayReadyRequest req) {
        Map<String, Object> body = new HashMap<>();
        body.put("cid", cid);
        body.put("partner_order_id", req.getPartnerOrderId());
        body.put("partner_user_id", req.getPartnerUserId());
        body.put("item_name", truncate(req.getItemName(), 100));
        body.put("quantity", req.getQuantity());
        body.put("total_amount", req.getTotalAmount());
        body.put("tax_free_amount", 0);
        body.put("approval_url", approvalUrl + "?orderNumber=" + req.getPartnerOrderId());

        return webClientBuilder.build()
                .post()
                .uri(apiUrl + "/payment/ready")
                .header(HttpHeaders.AUTHORIZATION, "SECRET_KEY " + secretKey)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(body)
                .retrieve()
                .onStatus(
                        status -> status.is4xxClientError() || status.is5xxServerError(),
                        response -> response.bodyToMono(String.class)
                                .doOnNext(errorBody -> System.err.println("🚨 KakaoPay 오류 응답: " + errorBody))
                                .flatMap(errorBody -> Mono.error(new RuntimeException("카카오Pay API 오류: " + errorBody)))
                )
                .bodyToMono(KakaoPayReadyResponse.class);
    }

    @Override
    public Mono<KakaoPayApproveResponse> approve(KakaoPayApproveRequest req) {
        // ✅ null 체크
        if (req.getTid() == null || req.getPartnerOrderId() == null || req.getPartnerUserId() == null || req.getPgToken() == null) {
            throw new IllegalArgumentException("KakaoPay 승인 요청 파라미터에 null 값이 포함되어 있습니다.");
        }

        Map<String, Object> body = Map.of(
                "cid", cid,
                "tid", req.getTid(),
                "partner_order_id", req.getPartnerOrderId(),
                "partner_user_id", req.getPartnerUserId(),
                "pg_token", req.getPgToken()
        );

        return webClientBuilder.build()
                .post()
                .uri(apiUrl + "/payment/approve")
                .header(HttpHeaders.AUTHORIZATION, "SECRET_KEY " + secretKey)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(body)
                .retrieve()
                .bodyToMono(KakaoPayApproveResponse.class);
    }

}