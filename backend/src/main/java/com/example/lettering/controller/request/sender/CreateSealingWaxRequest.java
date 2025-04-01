package com.example.lettering.controller.request.sender;

import com.example.lettering.domain.sealingwax.enums.DesignType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateSealingWaxRequest {
    private String sealingWaxName;
    private Integer imageCount;
    private DesignType designType;
}