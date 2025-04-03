package com.example.lettering.controller.request.sender;

import com.example.lettering.domain.sealingwax.enums.DesignType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateSealingWaxRequest {
    @NotBlank(message = "sealingWaxName 필수입니다.")
    @Size(max = 20, message = "sealingWaxName 20자를 초과할 수 없습니다.")
    private String sealingWaxName;

    @NotNull(message = "contentCount 필수입니다.")
    @Min(value = 1, message = "contentCount 1 이상이어야 합니다.")
    private Integer contentCount;

    @NotNull(message = "imageCount 필수입니다.")
    @Min(value = 1, message = "imageCount 0 이상이어야 합니다.")
    private Integer imageCount;

    @NotNull(message = "designType은 필수입니다.")
    private DesignType designType;
}