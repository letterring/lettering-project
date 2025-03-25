package com.example.lettering.domain.keyring.service;

import com.example.lettering.controller.request.OrderRequest;
import com.example.lettering.controller.response.KeyringDesignListResponse;
import com.example.lettering.controller.response.KeyringDesignResponse;
import com.example.lettering.controller.response.KeyringManageResponse;
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
import com.example.lettering.exception.type.DbException;
import com.example.lettering.exception.type.ValidationException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class KeyringServiceImpl implements KeyringService{

    private final KeyringDesignRepository keyringDesignRepository;
    private final KeyringRepository keyringRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    // ✅ 모든 키링 디자인 조회
    @Override
    public KeyringDesignListResponse getAllKeyringDesigns() {
        List<KeyringDesignResponse> designResponses = keyringDesignRepository.findAll().stream()
                .map(KeyringDesignResponse::from)
                .toList();

        return KeyringDesignListResponse.from(designResponses);
    }

    @Override
    public KeyringDesignResponse getKeyringDesignById(Long designId) {
        KeyringDesign design = keyringDesignRepository.findById(designId)
                .orElseThrow(() -> new DbException(ExceptionCode.DESIGN_NOT_FOUND));

        return KeyringDesignResponse.from(design);
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

        Order order = Order.create(
                user,
                orderNumber,
                request.getRealName(),
                request.getPhoneNumber(),
                request.getEmail(),
                request.getZipcode(),
                request.getRoadAddress(),
                request.getDetailAddress(),
                totalPrice
        );

        orderRepository.save(order);

        return orderNumber; // ✅ 주문번호 반환
    }

    @Override
    public void toggleFavorite(Long keyringId, Long userId) {
        Keyring keyring = keyringRepository.findById(keyringId)
                .orElseThrow(() -> new DbException(ExceptionCode.KEYRING_NOT_FOUND));

        if (!keyring.getOwner().getId().equals(userId)) {
            throw new ValidationException(ExceptionCode.UNAUTHORIZED_ACCESS);
        }

        keyring.toggleFavorite(); // true ↔ false 변경
        keyringRepository.save(keyring);
    }

    @Override
    public int registerKeyrings(List<String> tagCodes) {
        List<Keyring> keyrings = tagCodes.stream()
                .map(Keyring::createNew)
                .toList();

        keyringRepository.saveAll(keyrings);
        return keyrings.size();
    }

    @Override
    public List<KeyringManageResponse> getManageList(Long userId) {
        List<Keyring> keyrings = keyringRepository.findAllByOwnerIdOrderByIsFavoriteDescIdAsc(userId);

        return keyrings.stream()
                .map(k -> new KeyringManageResponse(
                        k.getId(),
                        k.getNfcName(),
                        k.getIsFavorite()
                )).toList();
    }

    @Override
    public void updateNfcName(Long keyringId, Long userId, String newName) {
        Keyring keyring = keyringRepository.findById(keyringId)
                .orElseThrow(() -> new DbException(ExceptionCode.KEYRING_NOT_FOUND));

        if (!keyring.getOwner().getId().equals(userId)) {
            throw new ValidationException(ExceptionCode.UNAUTHORIZED_ACCESS);
        }

        keyring.updateNfcName(newName);
    }

    @Override
    public void removeKeyringFromUser(Long keyringId, Long userId) {
        Keyring keyring = keyringRepository.findById(keyringId)
                .orElseThrow(() -> new DbException(ExceptionCode.KEYRING_NOT_FOUND));

        if (!keyring.getOwner().getId().equals(userId)) {
            throw new ValidationException(ExceptionCode.UNAUTHORIZED_ACCESS);
        }

        keyring.removeOwner(); // 소유 해제, but DB에 존재 유지
    }

    private Long generateOrderNumber() {
        Long lastNumber = orderRepository.getMaxOrderNumber();
        return (lastNumber != null) ? lastNumber + 1 : 1000001L;
    }

    @Override
    public KeyringManageResponse getKeyringById(Long keyringId, Long userId) {
        Keyring keyring = keyringRepository.findById(keyringId)
                .orElseThrow(() -> new DbException(ExceptionCode.KEYRING_NOT_FOUND));

        if (keyring.getOwner() == null || !keyring.getOwner().getId().equals(userId)) {
            throw new ValidationException(ExceptionCode.UNAUTHORIZED_ACCESS);
        }

        return new KeyringManageResponse(
                keyring.getId(),
                keyring.getNfcName(),
                keyring.getIsFavorite()
        );
    }



}
