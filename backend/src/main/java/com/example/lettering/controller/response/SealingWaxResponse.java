package com.example.lettering.controller.response;

import com.example.lettering.domain.sealingwax.entity.SealingWax;
import com.example.lettering.domain.sealingwax.enums.DesignType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SealingWaxResponse {
    private Long id;
    private String sealingWaxName;
    private Integer imageCount;
    private String imageUrl;
    private DesignType designType;

    public static SealingWaxResponse fromEntity(SealingWax sealingWax) {
        SealingWaxResponse response = new SealingWaxResponse();
        response.setId(sealingWax.getId());
        response.setSealingWaxName(sealingWax.getSealingWaxName());
        response.setImageCount(sealingWax.getImageCount());
        response.setImageUrl(sealingWax.getImageUrl());
        response.setDesignType(sealingWax.getDesignType());
        return response;
    }
}
