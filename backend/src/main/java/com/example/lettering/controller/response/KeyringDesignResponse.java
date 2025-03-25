package com.example.lettering.controller.response;

import com.example.lettering.domain.keyring.entity.KeyringDesign;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
public class KeyringDesignResponse {
    private Long id;
    private String designName;
    private String imageUrl;
    private Long price;
    private String description; // ✅ 추가

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
