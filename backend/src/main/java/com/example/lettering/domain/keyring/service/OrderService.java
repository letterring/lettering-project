package com.example.lettering.domain.keyring.service;


import com.example.lettering.controller.reuqest.OrderRequest;
import com.example.lettering.domain.keyring.entity.Keyring;
import com.example.lettering.domain.keyring.entity.KeyringDesign;
import com.example.lettering.domain.keyring.repository.KeyringDesignRepository;
import com.example.lettering.domain.keyring.repository.KeyringRepository;
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

    @Transactional
    public boolean processOrder(User user, OrderRequest request) {
        // ✅ 구매 가능한 키링 개수 확인
        long availableCount = keyringRepository.countAvailableKeyrings();

        if (availableCount < request.getQuantity()) {
            throw new RuntimeException("구매 가능한 키링이 부족합니다.");
        }

        // ✅ 선택한 디자인 ID가 존재하는지 확인
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

        // ✅ 주문자 정보 업데이트 (주소 정보 저장)
        user.updateAddress(
                request.getRealName(),
                request.getPhoneNumber(),
                request.getRoadAddress(),
                request.getDetailAddress()
        );
        userRepository.save(user);

        // ✅ 선택한 개수(n) 만큼 키링 정보 업데이트 (design_id 추가)
        for (Keyring keyring : availableKeyrings) {
            keyring.setIsPurchase(true);
            keyring.setOwner(user);
            keyring.setDesign(selectedDesign); // ✅ 주문한 디자인 ID 설정
        }
        keyringRepository.saveAll(availableKeyrings);

        return true;
    }
}