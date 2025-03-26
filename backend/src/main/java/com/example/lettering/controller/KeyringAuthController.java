package com.example.lettering.controller;

import com.example.lettering.domain.keyring.service.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/lettering")
public class KeyringAuthController {
    private final TokenService tokenService;

    @Value("${app.redirect-base-url}")
    private String redirectBaseUrl;

    @GetMapping("/{keyringId}")
    public ResponseEntity<Void> handleTag(@PathVariable Long keyringId, HttpServletRequest request) {
        String token = tokenService.generateToken();
        String mac = tokenService.generateMac(token);
        String ip = request.getRemoteAddr();
        String ua = request.getHeader("User-Agent");

        tokenService.storeToken(token, mac, keyringId, ip, ua);

        // 🔁 리디렉션 대상 URL
        String redirectUrl = redirectBaseUrl + "/" + keyringId + "?token=" + token + "&mac=" + mac;

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create(redirectUrl));
        return new ResponseEntity<>(headers, HttpStatus.FOUND); // 302 응답
    }
}