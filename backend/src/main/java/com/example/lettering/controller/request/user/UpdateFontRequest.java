package com.example.lettering.controller.request.user;


import com.example.lettering.domain.user.enums.Font;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class UpdateFontRequest {
    @NotNull(message = "변경할 폰트를 선택해주세요.")
    private Font font;
}
