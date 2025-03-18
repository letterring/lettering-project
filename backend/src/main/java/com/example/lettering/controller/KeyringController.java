package com.example.lettering.controller;

import com.example.lettering.domain.keyring.entity.KeyringDesign;
import com.example.lettering.domain.keyring.service.KeyringService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/keyrings")
@RequiredArgsConstructor
public class KeyringController {

    private final KeyringService keyringService;

    // ✅ 모든 키링 디자인 목록 조회 (구매 페이지에서 사용)
    @GetMapping("/designs")
    public ResponseEntity<List<KeyringDesign>> getAllKeyringDesigns() {
        List<KeyringDesign> keyringDesigns = keyringService.getAllKeyringDesigns();
        return ResponseEntity.ok(keyringDesigns);
    }
}
