package com.example.lettering.external.kakao.oauth;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

/**
 * 실제 사용보다는 Exteranl 예시로 넣어뒀습니다.
 * 따라서 폴더 구조 참고 하고 사용 안할시 삭제 부탁드립니다.
 */


@Service
@RequiredArgsConstructor
public class KakaoOauthClient {

    @Value("${kakao.oauth.client-id}")
    private String clientId;

    @Value("${kakao.oauth.redirect-uri}")
    private String redirectUri;

    private final WebClient webClient;

    public KakaoClientOauthTokenResponse getToken(String authorizationCode) {
        String url = "https://kauth.kakao.com/oauth/token";

        return webClient
                .post()
                .uri(url)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(BodyInserters.fromFormData("grant_type", "authorization_code")
                        .with("client_id", clientId)
                        .with("redirect_uri", redirectUri)
                        .with("code", authorizationCode))
                .retrieve()
                .bodyToMono(KakaoClientOauthTokenResponse.class)
                .block();
    }
}
