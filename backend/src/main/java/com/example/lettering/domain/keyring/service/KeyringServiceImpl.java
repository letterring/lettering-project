package com.example.lettering.domain.keyring.service;

import com.example.lettering.controller.request.keyring.KeyringCustomizeRequest;
import com.example.lettering.controller.request.keyring.KeyringDesignRequest;
import com.example.lettering.controller.request.user.OrderRequest;
import com.example.lettering.controller.response.keyring.KeyringDesignListResponse;
import com.example.lettering.controller.response.keyring.KeyringDesignResponse;
import com.example.lettering.controller.response.keyring.KeyringFilterResponse;
import com.example.lettering.controller.response.keyring.KeyringManageResponse;
import com.example.lettering.domain.keyring.entity.Keyring;
import com.example.lettering.domain.keyring.entity.KeyringDesign;
import com.example.lettering.domain.keyring.entity.Order;
import com.example.lettering.domain.keyring.repository.KeyringDesignRepository;
import com.example.lettering.domain.keyring.repository.KeyringRepository;
import com.example.lettering.domain.keyring.repository.OrderRepository;
import com.example.lettering.domain.message.dto.KeyringLastSentTime;
import com.example.lettering.domain.message.repository.AbstractMessageRepository;
import com.example.lettering.domain.user.entity.User;
import com.example.lettering.domain.user.repository.UserRepository;
import com.example.lettering.exception.ExceptionCode;
import com.example.lettering.exception.type.BusinessException;
import com.example.lettering.exception.type.DbException;
import com.example.lettering.exception.type.ValidationException;
import com.example.lettering.util.S3ImageUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class KeyringServiceImpl implements KeyringService{

    private final KeyringDesignRepository keyringDesignRepository;
    private final KeyringRepository keyringRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final AbstractMessageRepository abstractMessageRepository;
    private final S3ImageUtil s3ImageUtil;

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


    @Override
    public Order processOrderAndReturnOrder(User user, OrderRequest request) {
        long availableCount = keyringRepository.countAvailableKeyrings();
        if (availableCount < request.getQuantity()) {
            throw new BusinessException(ExceptionCode.KEYRING_NOT_ENOUGH);
        }

        KeyringDesign selectedDesign = keyringDesignRepository.findById(request.getKeyringDesignId())
                .orElseThrow(() -> new BusinessException(ExceptionCode.DESIGN_NOT_FOUND));

        List<Keyring> keyrings = keyringRepository.findAvailableKeyrings(request.getQuantity());
        if (keyrings.isEmpty()) {
            throw new BusinessException(ExceptionCode.KEYRING_NOT_FOUND);
        }

        user.updatePersonalInfo(
                request.getRealName(), request.getPhoneNumber(),
                request.getZipcode(), request.getRoadAddress(), request.getDetailAddress());
        userRepository.save(user);

        for (Keyring keyring : keyrings) {
            keyring.purchase(user, selectedDesign);
        }
        keyringRepository.saveAll(keyrings);

        Long totalPrice =  selectedDesign.getPrice() * request.getQuantity();

        Order order = Order.create(
                user, null, // 🚨 orderNumber는 approval에서 세팅
                request.getRealName(), request.getPhoneNumber(), request.getEmail(),
                request.getZipcode(), request.getRoadAddress(), request.getDetailAddress(),
                totalPrice
        );

        order.addKeyringIds(
                keyrings.stream().map(Keyring::getId).toList()
        );

        return order;
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
        List<Long> keyringIds = keyrings.stream().map(Keyring::getId).toList();

        Map<Long, LocalDateTime> lastSentTimeMap = abstractMessageRepository
                .findLastSentTimesByKeyringIds(keyringIds)
                .stream()
                .collect(Collectors.toMap(
                        KeyringLastSentTime::getKeyringId,
                        KeyringLastSentTime::getLastSentTime
                ));

        return keyrings.stream()
                .map(k -> new KeyringManageResponse(
                        k.getId(),
                        k.getNfcName(),
                        k.getIsFavorite(),
                        k.getTagCode(),
                        k.getDesign().getImageUrl(),
                        lastSentTimeMap.get(k.getId())
                ))
                .toList();
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


    @Override
    public KeyringManageResponse getKeyringById(Long keyringId, Long userId) {
        Keyring keyring = keyringRepository.findById(keyringId)
                .orElseThrow(() -> new DbException(ExceptionCode.KEYRING_NOT_FOUND));

        if (keyring.getOwner() == null || !keyring.getOwner().getId().equals(userId)) {
            throw new ValidationException(ExceptionCode.UNAUTHORIZED_ACCESS);
        }

        LocalDateTime lastSentTime = abstractMessageRepository.findLastSentTimeByKeyring(keyringId);

        return new KeyringManageResponse(
                keyring.getId(),
                keyring.getNfcName(),
                keyring.getIsFavorite(),
                keyring.getTagCode(),
                keyring.getDesign().getImageUrl(),
                lastSentTime
        );
    }

    @Override
    public void saveOrder(Order order) {
        orderRepository.save(order);
    }

    @Override
    public Long generateTempOrderNumber() {
        Long lastNumber = orderRepository.getMaxOrderNumber();
        return (lastNumber != null) ? lastNumber + 1 : 1000001L;
    }


    @Override
    public KeyringDesignResponse createKeyringDesign(KeyringDesignRequest request, MultipartFile image) throws IOException {
        String imageUrl = s3ImageUtil.uploadImage(image, "keyring-designs");

        KeyringDesign design = KeyringDesign.fromDto(request, imageUrl);

        return KeyringDesignResponse.from(keyringDesignRepository.save(design));
    }

    @Override
    public void deleteKeyring(Long keyringId) {
        Keyring keyring = keyringRepository.findById(keyringId)
                .orElseThrow(() -> new BusinessException(ExceptionCode.KEYRING_NOT_FOUND));

        keyringRepository.delete(keyring);
    }

    @Override
    public List<KeyringFilterResponse> getKeyringsByOwner(Long ownerId) {
        List<Keyring> keyrings = keyringRepository.findAllByOwnerId(ownerId);
 
        return keyrings.stream()
                .map(keyring -> new KeyringFilterResponse(keyring.getId(), keyring.getNfcName()))
                .collect(Collectors.toList());
    }

    @Override
    public void customizeKeyrings(Long userId, List<KeyringCustomizeRequest.KeyringInfo> keyrings) {
        for (KeyringCustomizeRequest.KeyringInfo info : keyrings) {
            Keyring keyring = keyringRepository.findById(info.getKeyringId())
                    .orElseThrow(() -> new BusinessException(ExceptionCode.KEYRING_NOT_FOUND));

            if (!keyring.getOwner().getId().equals(userId)) {
                throw new ValidationException(ExceptionCode.UNAUTHORIZED_ACCESS);
            }

            // ✅ null 또는 빈 문자열("") 아닌 경우만 업데이트
            if (info.getNfcName() != null && !info.getNfcName().isBlank()) {
                keyring.updateNfcName(info.getNfcName());
            }

            if (info.getCustomMessage() != null && !info.getCustomMessage().isBlank()) {
                keyring.setCustomMessage(info.getCustomMessage());
            }
        }
    }




}
