package com.example.lettering.controller;

import com.example.lettering.controller.request.sender.CreateSealingWaxRequest;
import com.example.lettering.controller.response.sender.SealingWaxListResponse;
import com.example.lettering.controller.response.sender.SealingWaxResponse;
import com.example.lettering.domain.sealingwax.service.SealingWaxService;
import com.example.lettering.util.SwaggerBody;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Encoding;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
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

    @Operation(summary = "실링왁스 등록 API", description = "실링왁스 디자인을 추가합니다.")
    @SwaggerBody(content = @Content(encoding = @Encoding(name = "sealingwax", contentType = MediaType.APPLICATION_JSON_VALUE)))
    @PostMapping(value = "/backoffice", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<SealingWaxResponse> createSealingWax(
            @RequestPart("sealingwax") @Valid CreateSealingWaxRequest createSealingWaxRequest,
            @RequestPart("image") MultipartFile imageFile) throws IOException {
        return ResponseEntity.ok(sealingWaxService.createSealingWax(createSealingWaxRequest, imageFile));
    }

    @Operation(summary = "실링왁스 목록 불러오기 API", description = "실링왁스 디자인 목록을 가져옵니다.")
    @GetMapping
    public ResponseEntity<SealingWaxListResponse> getAllSealingWaxes() {
        return ResponseEntity.ok(SealingWaxListResponse.of(sealingWaxService.getAllSealingWaxes()));
    }
}
