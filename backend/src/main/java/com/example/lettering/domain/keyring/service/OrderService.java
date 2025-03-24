package com.example.lettering.domain.keyring.service;


import com.example.lettering.controller.request.OrderRequest;
import com.example.lettering.domain.keyring.entity.Keyring;
import com.example.lettering.domain.keyring.entity.KeyringDesign;
import com.example.lettering.domain.keyring.entity.Order;
import com.example.lettering.domain.keyring.repository.KeyringDesignRepository;
import com.example.lettering.domain.keyring.repository.KeyringRepository;
import com.example.lettering.domain.keyring.repository.OrderRepository;
import com.example.lettering.domain.user.entity.User;
import com.example.lettering.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final KeyringRepository keyringRepository;
    private final KeyringDesignRepository keyringDesignRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    @Transactional
    public Long processOrder(User user, OrderRequest request) {
        // ✅ 구매 가능한 키링 개수 확인
        long availableCount = keyringRepository.countAvailableKeyrings();
        if (availableCount < request.getQuantity()) {
            throw new RuntimeException("구매 가능한 키링이 부족합니다.");
        }

        // ✅ 디자인 확인
        Optional<KeyringDesign> designOptional = keyringDesignRepository.findById(request.getKeyringDesignId());
        if (designOptional.isEmpty()) {
            throw new RuntimeException("선택한 디자인을 찾을 수 없습니다.");
        }
        KeyringDesign selectedDesign = designOptional.get();

        // ✅ 구매 가능한 키링 가져오기
        List<Keyring> availableKeyrings = keyringRepository.findAvailableKeyrings(request.getQuantity());
        if (availableKeyrings.isEmpty()) {
            throw new RuntimeException("구매 가능한 키링을 찾을 수 없습니다.");
        }

        // ✅ 주소 저장
        user.updateAddress(
                request.getRealName(),
                request.getPhoneNumber(),
                request.getZipcode(),
                request.getRoadAddress(),
                request.getDetailAddress()
        );
        userRepository.save(user);

        // ✅ 키링 상태 업데이트
        for (Keyring keyring : availableKeyrings) {
            keyring.setIsPurchase(true);
            keyring.setOwner(user);
            keyring.setDesign(selectedDesign);
        }
        keyringRepository.saveAll(availableKeyrings);

        // ✅ 주문번호 생성 및 주문 저장
        Long orderNumber = generateOrderNumber();
        int totalPrice = selectedDesign.getPrice().intValue() * request.getQuantity();

        Order order = Order.builder()
                .orderNumber(orderNumber)
                .user(user)
                .realName(request.getRealName())
                .phoneNumber(request.getPhoneNumber())
                .email(request.getEmail())
                .zipcode(request.getZipcode())
                .roadAddress(request.getRoadAddress())
                .detailAddress(request.getDetailAddress())
                .totalPrice(totalPrice)
                .build();

        orderRepository.save(order);

        return orderNumber; // ✅ 주문번호 반환
    }

    private Long generateOrderNumber() {
        Long lastNumber = orderRepository.getMaxOrderNumber();
        return (lastNumber != null) ? lastNumber + 1 : 1000001L;
    }
}