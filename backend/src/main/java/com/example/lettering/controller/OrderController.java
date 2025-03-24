package com.example.lettering.controller;


import com.example.lettering.controller.request.OrderRequest;
import com.example.lettering.controller.response.OrderResponse;
import com.example.lettering.domain.keyring.service.OrderService;
import com.example.lettering.domain.user.entity.User;
import com.example.lettering.domain.user.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
@Tag(name = "Order API", description = "주문 관련 API")
public class OrderController {

    private final OrderService orderService;
    private final UserRepository userRepository;

    @Operation(summary = "주문 생성", description = "주문 정보를 받아 키링을 할당하고 주문번호를 생성합니다.")
    @PostMapping
    public ResponseEntity<?> placeOrder(HttpSession session, @RequestBody OrderRequest request) {
        Long userId = (Long) session.getAttribute("userId");
        System.out.println("🔍 현재 세션 ID: " + session.getId());

        if (userId == null) {
            System.out.println("🚨 세션에 userId 없음!");
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(401).body("유저 정보를 찾을 수 없습니다.");
        }

        User user = userOptional.get();
        System.out.println("✅ 세션 유지됨! 유저: " + user.getEmail());

        // ✅ 주문 처리 및 주문번호 반환
        Long orderNumber = orderService.processOrder(user, request);
        return ResponseEntity.ok(new OrderResponse(orderNumber));
    }
}
