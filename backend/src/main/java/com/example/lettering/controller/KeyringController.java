package com.example.lettering.controller;

import com.example.lettering.controller.request.KeyringDesignRequest;
import com.example.lettering.controller.request.KeyringTagRequest;
import com.example.lettering.controller.request.UpdateNfcNameRequest;
import com.example.lettering.controller.response.*;
import com.example.lettering.domain.keyring.entity.KeyringDesign;
import com.example.lettering.domain.keyring.service.KeyringService;
import com.example.lettering.exception.ExceptionCode;
import com.example.lettering.exception.type.ValidationException;
import com.example.lettering.util.SwaggerBody;
import com.example.lettering.util.dto.BooleanResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Encoding;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/keyrings")
@RequiredArgsConstructor
@Tag(name = "Keyring API", description = "키링 관련 API")
public class KeyringController {

    private final KeyringService keyringService;

    // ✅ 모든 키링 디자인 목록 조회 (구매 페  이지에서 사용)
    @Operation(summary = "키링 디자인 목록 조회", description = "모든 키링 디자인을 조회합니다.")
    @GetMapping("/designs")
    public ResponseEntity<KeyringDesignListResponse> getAllKeyringDesigns() {
        return ResponseEntity.ok(keyringService.getAllKeyringDesigns());
    }

    @GetMapping("/designs/{designId}")
    @Operation(summary = "키링 디자인 단건 조회", description = "디자인 ID를 통해 해당 키링 디자인의 상세 정보를 조회합니다.")
    public ResponseEntity<KeyringDesignResponse> getKeyringDesignById(@PathVariable Long designId) {
        KeyringDesignResponse design = keyringService.getKeyringDesignById(designId);
        return ResponseEntity.ok(design);
    }


    @PatchMapping("/{keyringId}/favorite")
    @Operation(summary = "키링 즐겨찾기 토글", description = "키링 즐겨찾기 상태를 토글합니다.")
    public ResponseEntity<BooleanResponse> toggleFavorite(
            @PathVariable Long keyringId,
            HttpSession session
    ) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            throw new ValidationException(ExceptionCode.SESSION_USER_NOT_FOUND);
        }

        keyringService.toggleFavorite(keyringId, userId);
        return ResponseEntity.ok(BooleanResponse.success());
    }

    @PostMapping("/backoffice")
    @Operation(
            summary = "키링 태그 등록 (Backoffice 전용)",
            description = "NFC 태그 코드를 받아 서버에 키링을 일괄 등록합니다. 구매되지 않은 초기 키링 생성 시 사용됩니다."
    )
    public ResponseEntity<?> registerKeyrings(@RequestBody KeyringTagRequest request) {
        int count = keyringService.registerKeyrings(request.getTagCodes());
        return ResponseEntity.ok(
                Map.of("message", count + "개의 키링이 등록되었습니다.")
        );
    }

    @Operation(summary = "키링 디자인 등록 API", description = "디자인 정보와 이미지를 함께 등록합니다.")
    @SwaggerBody(content = @Content(
            encoding = @Encoding(name = "keyringDesign", contentType = MediaType.APPLICATION_JSON_VALUE)
    ))
    @PostMapping(value = "/designs/backoffice", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<KeyringDesignResponse> createDesign(
            @RequestPart("keyringDesign") KeyringDesignRequest request,
            @RequestPart("image") MultipartFile image
    ) throws IOException {
        return ResponseEntity.ok(keyringService.createKeyringDesign(request, image));
    }

    @GetMapping("/manage")
    @Operation(summary = "내 키링 목록 조회", description = "관리 화면에서 내 키링을 정렬된 형태로 조회합니다.")
    public ResponseEntity<List<KeyringManageResponse>> getKeyringManageList(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) throw new ValidationException(ExceptionCode.SESSION_USER_NOT_FOUND);

        return ResponseEntity.ok(keyringService.getManageList(userId));
    }

    @PatchMapping("/{keyringId}/nfcname")
    @Operation(summary = "키링 이름 수정", description = "선택한 키링의 NFC 이름(우체통 이름)을 수정합니다.")
    public ResponseEntity<?> updateKeyringName(
            @PathVariable Long keyringId,
            @RequestBody @Valid UpdateNfcNameRequest request,
            HttpSession session
    ) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) throw new ValidationException(ExceptionCode.SESSION_USER_NOT_FOUND);

        keyringService.updateNfcName(keyringId, userId, request.getNfcName());

        return ResponseEntity.ok(Map.of("message", "키링 이름이 수정되었습니다."));
    }

    @DeleteMapping("/{keyringId}")
    @Operation(summary = "키링 소유 해제", description = "해당 키링을 내 리스트에서 삭제합니다.")
    public ResponseEntity<?> removeKeyring(@PathVariable Long keyringId, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) throw new ValidationException(ExceptionCode.SESSION_USER_NOT_FOUND);

        keyringService.removeKeyringFromUser(keyringId, userId);
        return ResponseEntity.ok(Map.of("message", "키링이 내 목록에서 제거되었습니다."));
    }

    @GetMapping("/{keyringId}")
    @Operation(summary = "키링 단건 조회", description = "키링 ID를 통해 해당 키링의 상세 정보를 조회합니다.")
    public ResponseEntity<KeyringManageResponse> getKeyringById(
            @PathVariable Long keyringId,
            HttpSession session
    ) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) throw new ValidationException(ExceptionCode.SESSION_USER_NOT_FOUND);

        KeyringManageResponse response = keyringService.getKeyringById(keyringId, userId);
        return ResponseEntity.ok(response);
    }


}
