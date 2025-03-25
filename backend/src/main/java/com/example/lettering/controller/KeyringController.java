package com.example.lettering.controller;

import com.example.lettering.controller.request.KeyringTagRequest;
import com.example.lettering.controller.request.OrderRequest;
import com.example.lettering.controller.response.KeyringDesignListResponse;
import com.example.lettering.controller.response.KeyringDesignResponse;
import com.example.lettering.controller.response.OrderResponse;
import com.example.lettering.domain.keyring.entity.Keyring;
import com.example.lettering.domain.keyring.entity.KeyringDesign;
import com.example.lettering.domain.keyring.service.KeyringService;
import com.example.lettering.domain.user.entity.User;
import com.example.lettering.domain.user.service.UserService;
import com.example.lettering.exception.ExceptionCode;
import com.example.lettering.exception.type.ValidationException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/keyrings")
@RequiredArgsConstructor
@Tag(name = "Keyring API", description = "키링 관련 API")
public class KeyringController {

    private final KeyringService keyringService;
    private final UserService userService;

    // ✅ 모든 키링 디자인 목록 조회 (구매 페이지에서 사용)
    @Operation(summary = "키링 디자인 목록 조회", description = "모든 키링 디자인을 조회합니다.")
    @GetMapping("/designs")
    public ResponseEntity<KeyringDesignListResponse> getAllKeyringDesigns() {
        return ResponseEntity.ok(keyringService.getAllKeyringDesigns());
    }


    @Operation(summary = "주문 생성", description = "주문 정보를 받아 키링을 할당하고 주문번호를 생성합니다.")
    @PostMapping("/order")
    public ResponseEntity<?> placeOrder(HttpSession session, @RequestBody OrderRequest request) {
        Long userId = (Long) session.getAttribute("userId");

        if (userId == null) {
            throw new ValidationException(ExceptionCode.SESSION_USER_NOT_FOUND);
        }

        User user = userService.getUserById(userId);

        Long orderNumber = keyringService.processOrder(user, request);
        return ResponseEntity.ok(new OrderResponse(orderNumber));
    }

    @PatchMapping("/{keyringId}/favorite")
    @Operation(summary = "키링 즐겨찾기 토글", description = "키링 즐겨찾기 상태를 토글합니다.")
    public ResponseEntity<?> toggleFavorite(
            @PathVariable Long keyringId,
            HttpSession session
    ) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            throw new ValidationException(ExceptionCode.SESSION_USER_NOT_FOUND);
        }

        keyringService.toggleFavorite(keyringId, userId);
        return ResponseEntity.ok(Collections.singletonMap("message", "즐겨찾기 상태가 변경되었습니다."));
    }

    @PostMapping("/backoffice")
    public ResponseEntity<?> registerKeyrings(@RequestBody KeyringTagRequest request) {
        int count = keyringService.registerKeyrings(request.getTagCodes());
        return ResponseEntity.ok(
                Map.of("message", count + "개의 키링이 등록되었습니다.")
        );
    }
}
