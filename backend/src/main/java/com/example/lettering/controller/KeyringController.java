package com.example.lettering.controller;

import com.example.lettering.controller.request.keyring.*;
import com.example.lettering.controller.response.keyring.KeyringDesignListResponse;
import com.example.lettering.controller.response.keyring.KeyringDesignResponse;
import com.example.lettering.controller.response.keyring.KeyringManageResponse;
import com.example.lettering.domain.keyring.service.KeyringService;
import com.example.lettering.exception.ExceptionCode;
import com.example.lettering.exception.type.BusinessException;
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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/keyrings")
@RequiredArgsConstructor
@Tag(name = "Keyring API", description = "키링 관련 API")
public class KeyringController {

    private final KeyringService keyringService;

    @Value("${app.redirect-success-url}")
    private String successBaseUrl;

    @Value("${app.redirect-fail-url}")
    private String failBaseUrl;

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
    public ResponseEntity<Map<String, Object>> registerKeyrings(@RequestBody KeyringTagRequest request) {
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
    public ResponseEntity<Map<String, Object>> updateKeyringName(
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
    public ResponseEntity<Map<String, Object>> removeKeyring(@PathVariable Long keyringId, HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) throw new ValidationException(ExceptionCode.SESSION_USER_NOT_FOUND);

        keyringService.removeKeyringFromUser(keyringId, userId);
        return ResponseEntity.ok(Map.of("message", "키링이 내 목록에서 제거되었습니다."));
    }

    @DeleteMapping("/{keyringId}/delete")
    @Operation(summary = "키링 삭제", description = "키링 ID를 통해 키링을 완전히 삭제합니다.")
    public ResponseEntity<BooleanResponse> deleteKeyring(@PathVariable Long keyringId) {
        keyringService.deleteKeyring(keyringId);
        return ResponseEntity.ok(BooleanResponse.success());
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

    @PatchMapping("/customize")
    @Operation(summary = "키링 닉네임 및 메시지 설정", description = "키링 ID 리스트에 대해 닉네임과 메시지를 설정합니다.")
    public ResponseEntity<BooleanResponse> customizeKeyrings(
            @RequestBody KeyringCustomizeRequest request,
            HttpSession session
    ) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) throw new ValidationException(ExceptionCode.SESSION_USER_NOT_FOUND);

        keyringService.customizeKeyrings(userId, request.getKeyrings());

        return ResponseEntity.ok(BooleanResponse.success());
    }

    @PostMapping("/nfc-access")
    @Operation(summary = "디바이스 등록 및 검증", description = "앱에서 진입 시 디바이스 검증 또는 등록 후 결과 제공")
    public ResponseEntity<Void> handleNfcAccess(@RequestBody KeyringAccessRequest request) {
        try {
            Long keyringId = keyringService.validateOrRegisterDevice(request.getId(), request.getDeviceId());

            return ResponseEntity
                    .ok()
                    .header("X-Keyring-Id", keyringId.toString())
                    .build();

        } catch (BusinessException e) {
            return ResponseEntity
                    .status(HttpStatus.FOUND)
                    .location(URI.create(failBaseUrl))
                    .build();
        }
    }

    @GetMapping("/{keyringId}/custom-message")
    @Operation(summary = "키링 커스텀 메시지 조회", description = "keyringId에 해당하는 커스텀 메시지를 반환합니다.")
    public ResponseEntity<Map<String, String>> getCustomMessageByKeyringId(@PathVariable Long keyringId) {
        String message = keyringService.getCustomMessage(keyringId);
        return ResponseEntity.ok(Map.of("customMessage", message));
    }

}
