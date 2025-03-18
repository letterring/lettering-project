package com.example.lettering.controller;


import com.example.lettering.controller.reuqest.OrderRequest;
import com.example.lettering.domain.keyring.service.OrderService;
import com.example.lettering.domain.user.entity.User;
import com.example.lettering.domain.user.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<String> placeOrder(HttpSession session, @RequestBody OrderRequest request) {
        // ✅ 세션에서 userId 가져오기
        Long userId = (Long) session.getAttribute("userId");

        // ✅ 세션 유지 여부 디버깅 로그 추가
        System.out.println("🔍 현재 세션 ID: " + session.getId());

        if (userId == null) {
            System.out.println("🚨 세션에 userId 없음! 새로운 세션이 생성되었는지 확인하세요.");
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        // ✅ userId를 기반으로 유저 조회
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(401).body("유저 정보를 찾을 수 없습니다.");
        }
        User user = userOptional.get();

        System.out.println("✅ 세션 유지됨! 유저: " + user.getEmail());

        boolean success = orderService.processOrder(user, request);
        return success ? ResponseEntity.ok("주문이 완료되었습니다.")
                : ResponseEntity.status(400).body("구매 가능한 키링이 부족합니다.");
    }
}
