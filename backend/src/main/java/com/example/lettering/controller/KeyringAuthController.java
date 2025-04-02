package com.example.lettering.controller;

import com.example.lettering.controller.request.keyring.TextRequest;
import com.example.lettering.domain.keyring.service.KeyringAuthService;
import com.example.lettering.domain.keyring.service.KeyringSessionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/lettering")
@Tag(name = "NFC 인증", description = "NFC 태그 인증 및 세션 발급 관련 API")
public class KeyringAuthController {

    private final KeyringAuthService keyringAuthService;
    private final KeyringSessionService sessionService;

    @Value("${app.redirect-success-url}")
    private String successBaseUrl;

    @Value("${app.redirect-fail-url}")
    private String failBaseUrl;

    @Operation(
            summary = "NFC 태깅 처리",
            description = "NFC 태그를 통해 전달된 keyringId와 텍스트가 일치하는지 확인 후, 일치하면 세션을 발급하고 리디렉션합니다.\n\n" +
                    "- 성공 시: 302 Redirect + Authorization 헤더에 세션 토큰 포함\n" +
                    "- 실패 시: 실패 URL로 리디렉션"
    )
    @PostMapping("/{keyringId}")
    public ResponseEntity<Void> handleNfcTag(
            @PathVariable Long keyringId,
            @RequestBody TextRequest requestBody,
            HttpServletRequest request
    ) {
        String text = requestBody.getText();
        String ip = request.getRemoteAddr();
        String ua = request.getHeader("User-Agent");

        if (!keyringAuthService.isTextValid(keyringId, text)) {
            return ResponseEntity.status(HttpStatus.FOUND)
                    .location(URI.create(failBaseUrl + "?reason=unauthorized"))
                    .build();
        }

        String sessionToken = sessionService.issueSession(keyringId, ip, ua);

        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create(successBaseUrl))
                .header("Authorization", "Bearer " + sessionToken)
                .build();
    }

}


