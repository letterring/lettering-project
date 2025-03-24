package com.example.lettering.domain.keyring.service;

import com.example.lettering.controller.request.OrderRequest;
import com.example.lettering.controller.response.KeyringDesignResponse;
import com.example.lettering.domain.keyring.entity.Keyring;
import com.example.lettering.domain.keyring.entity.KeyringDesign;
import com.example.lettering.domain.keyring.entity.Order;
import com.example.lettering.domain.keyring.repository.KeyringDesignRepository;
import com.example.lettering.domain.keyring.repository.KeyringRepository;
import com.example.lettering.domain.keyring.repository.OrderRepository;
import com.example.lettering.domain.user.entity.User;
import com.example.lettering.domain.user.repository.UserRepository;
import com.example.lettering.exception.ExceptionCode;
import com.example.lettering.exception.type.BusinessException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class KeyringServiceImpl implements KeyringService{

    private final KeyringDesignRepository keyringDesignRepository;
    private final KeyringRepository keyringRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    // ✅ 모든 키링 디자인 조회
    @Override
    public List<KeyringDesignResponse> getAllKeyringDesigns() {
        return keyringDesignRepository.findAll().stream()
                .map(KeyringDesignResponse::from)
                .toList();
    }


    @Transactional
    @Override
    public Long processOrder(User user, OrderRequest request) {
        // ✅ 구매 가능한 키링 개수 확인
        long availableCount = keyringRepository.countAvailableKeyrings();
        if (availableCount < request.getQuantity()) {
            throw new BusinessException(ExceptionCode.KEYRING_NOT_ENOUGH);
        }

        // ✅ 디자인 확인
        KeyringDesign selectedDesign = keyringDesignRepository.findById(request.getKeyringDesignId())
                .orElseThrow(() -> new BusinessException(ExceptionCode.DESIGN_NOT_FOUND));

        // ✅ 구매 가능한 키링 가져오기
        List<Keyring> availableKeyrings = keyringRepository.findAvailableKeyrings(request.getQuantity());
        if (availableKeyrings.isEmpty()) {
            throw new BusinessException(ExceptionCode.KEYRING_NOT_FOUND);
        }

        // ✅ 주소 저장
        user.updatePersonalInfo(
                request.getRealName(),
                request.getPhoneNumber(),
                request.getZipcode(),
                request.getRoadAddress(),
                request.getDetailAddress()
        );
        userRepository.save(user);

        // ✅ 키링 상태 업데이트
        for (Keyring keyring : availableKeyrings) {
            keyring.purchase(user, selectedDesign);
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
