package com.example.lettering.controller;

import com.example.lettering.controller.request.OrderRequest;
import com.example.lettering.controller.request.KakaoPayReadyRequest;
import com.example.lettering.controller.request.KakaoPayApproveRequest;
import com.example.lettering.controller.response.KakaoPayReadyResponse;
import com.example.lettering.controller.response.KakaoPayApproveResponse;
import com.example.lettering.controller.response.PaymentReadyResponse;
import com.example.lettering.domain.keyring.entity.KeyringDesign;
import com.example.lettering.domain.keyring.entity.Order;
import com.example.lettering.domain.keyring.repository.KeyringDesignRepository;
import com.example.lettering.domain.user.entity.User;
import com.example.lettering.domain.keyring.service.KeyringService;
import com.example.lettering.domain.user.service.UserService;
import com.example.lettering.exception.type.BusinessException;
import com.example.lettering.external.kakao.pay.service.KakaoPayService;
import com.example.lettering.exception.ExceptionCode;
import com.example.lettering.exception.type.ValidationException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
@Tag(name = "Payment API", description = "카카오페이 결제 처리 API")
public class PaymentController {

    private final KeyringService keyringService;
    private final UserService userService;
    private final KakaoPayService kakaoPayService;
    private final KeyringDesignRepository keyringDesignRepository;

    @PostMapping("/order")
    @Operation(summary = "결제 준비", description = "주문 생성 없이 결제 준비 후 결제창 URL 반환")
    public ResponseEntity<PaymentReadyResponse> placeOrder(HttpSession session, @RequestBody OrderRequest request) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) throw new ValidationException(ExceptionCode.SESSION_USER_NOT_FOUND);

        User user = userService.getUserById(userId);
        Long tempOrderNumber = keyringService.generateTempOrderNumber();

        KeyringDesign design = keyringDesignRepository.findById(request.getKeyringDesignId())
                .orElseThrow(() -> new BusinessException(ExceptionCode.DESIGN_NOT_FOUND));

        int totalAmount = (int) (design.getPrice() * request.getQuantity());

        KakaoPayReadyRequest readyRequest = KakaoPayReadyRequest.builder()
                .partnerOrderId(String.valueOf(tempOrderNumber))
                .partnerUserId(String.valueOf(user.getId()))
                .itemName("키링 " + request.getQuantity() + "개")
                .quantity(request.getQuantity())
                .totalAmount(totalAmount)
                .build();

        KakaoPayReadyResponse kakao = kakaoPayService.ready(readyRequest).block();

        session.setAttribute("pendingOrder", Map.of(
                "orderNumber", tempOrderNumber,
                "request", request,
                "tid", kakao.getTid()
        ));

        return ResponseEntity.ok(new PaymentReadyResponse(
                tempOrderNumber,
                kakao.getNext_redirect_pc_url()
        ));
    }

    @GetMapping("/approve")
    @Operation(summary = "결제 승인", description = "카카오페이 결제 승인 처리 후 DB 저장")
    public ResponseEntity<?> approve(
            @RequestParam("pg_token") String pgToken,
            @RequestParam("orderNumber") String orderNumberStr,
            HttpSession session
    ) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) throw new ValidationException(ExceptionCode.SESSION_USER_NOT_FOUND);

        Map<String, Object> pendingOrder = (Map<String, Object>) session.getAttribute("pendingOrder");
        if (pendingOrder == null || !pendingOrder.get("orderNumber").toString().equals(orderNumberStr)) {
            throw new ValidationException(ExceptionCode.ORDER_NOT_FOUND);
        }

        OrderRequest orderRequest = (OrderRequest) pendingOrder.get("request");
        String tid = (String) pendingOrder.get("tid");
        if (tid == null) throw new ValidationException(ExceptionCode.ORDER_NOT_FOUND);

        User user = userService.getUserById(userId);
        Order order = keyringService.processOrderAndReturnOrder(user, orderRequest);
        order.setOrderNumber(Long.parseLong(orderNumberStr));
        order.setTid(tid); // ✅ 저장된 tid 다시 세팅

        KakaoPayApproveRequest approveRequest = KakaoPayApproveRequest.builder()
                .partnerOrderId(orderNumberStr)
                .partnerUserId(String.valueOf(user.getId()))
                .pgToken(pgToken)
                .tid(tid)
                .build();

        KakaoPayApproveResponse response = kakaoPayService.approve(approveRequest).block();

        order.markAsPaid();
        keyringService.saveOrder(order);

        session.removeAttribute("pendingOrder"); // ✅ 세션 클리어

        return ResponseEntity.ok(Map.of(
                "message", "결제가 완료되었습니다.",
                "amount", response.getAmount().getTotal()
        ));
    }

}
