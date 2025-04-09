package com.example.lettering.controller.response.keyring;

import com.example.lettering.domain.keyring.entity.KeyringDesign;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class KeyringDesignWithStockResponse {
    private Long id;
    private String designName;
    private String imageUrl;
    private Long price;
    private String description;
    private Long availableStock;

    public static KeyringDesignWithStockResponse from(KeyringDesign design, Long stock) {
        return new KeyringDesignWithStockResponse(
                design.getId(),
                design.getDesignName(),
                design.getImageUrl(),
                design.getPrice(),
                design.getDescription(),
                stock
        );
    }
}