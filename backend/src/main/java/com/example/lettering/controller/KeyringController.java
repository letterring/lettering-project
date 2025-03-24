package com.example.lettering.controller;

import com.example.lettering.domain.keyring.entity.KeyringDesign;
import com.example.lettering.domain.keyring.service.KeyringService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/keyrings")
@RequiredArgsConstructor
@Tag(name = "Keyring API", description = "키링 관련 API")
public class KeyringController {

    private final KeyringService keyringService;

    // ✅ 모든 키링 디자인 목록 조회 (구매 페이지에서 사용)
    @Operation(summary = "키링 디자인 목록 조회", description = "모든 키링 디자인을 조회합니다.")
    @GetMapping("/designs")
    public ResponseEntity<List<KeyringDesign>> getAllKeyringDesigns() {
        List<KeyringDesign> keyringDesigns = keyringService.getAllKeyringDesigns();
        return ResponseEntity.ok(keyringDesigns);
    }
}
