package com.example.lettering.controller;

import com.example.lettering.controller.request.OrderRequest;
import com.example.lettering.controller.response.KeyringDesignListResponse;
import com.example.lettering.controller.response.KeyringDesignResponse;
import com.example.lettering.controller.response.OrderResponse;
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

import java.util.List;

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
}
