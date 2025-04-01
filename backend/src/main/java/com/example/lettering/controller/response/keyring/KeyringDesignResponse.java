package com.example.lettering.controller.response.keyring;

import com.example.lettering.domain.keyring.entity.KeyringDesign;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class KeyringDesignResponse {
    private Long id;
    private String designName;
    private String imageUrl;
    private Long price;
    private String description; // ✅ 추가

    // ✅ 변환 메서드: Entity → DTO
    public static KeyringDesignResponse from(KeyringDesign entity) {
        return new KeyringDesignResponse(
                entity.getId(),
                entity.getDesignName(),
                entity.getImageUrl(),
                entity.getPrice(),
                entity.getDescription() // ✅ 추가
        );
    }
}