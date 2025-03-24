package com.example.lettering.controller;

import com.example.lettering.controller.request.CreateSealingWaxRequest;
import com.example.lettering.controller.response.SealingWaxListResponse;
import com.example.lettering.controller.response.SealingWaxResponse;
import com.example.lettering.domain.sealingwax.service.SealingWaxService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/sealingwax")
@RequiredArgsConstructor
@Tag(name = "SealingWax API", description = "SealingWax 관리 API")
public class SealingWaxController {

    private final SealingWaxService sealingWaxService;

    @Operation(summary = "실링왁스 등록 기능", description = "실링왁스 디자인을 추가합니다.")
    @PostMapping("/backoffice")
    public ResponseEntity<SealingWaxResponse> createSealingWax(
            @RequestPart("sealingwax") CreateSealingWaxRequest createSealingWaxRequest,
            @RequestPart("image") MultipartFile imageFile) throws IOException {

        createSealingWaxRequest.setImageFile(imageFile);
        return ResponseEntity.ok(sealingWaxService.createSealingWax(createSealingWaxRequest));
    }

    @Operation(summary = "실링왁스 목록 불러오기 기능", description = "실링왁스 디자인 목록을 가져옵니다.")
    @GetMapping
    public ResponseEntity<SealingWaxListResponse> getAllSealingWaxes() {
        return ResponseEntity.ok(SealingWaxListResponse.of(sealingWaxService.getAllSealingWaxes()));
    }
}
