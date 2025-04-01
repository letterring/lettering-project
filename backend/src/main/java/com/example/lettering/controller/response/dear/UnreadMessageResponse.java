package com.example.lettering.controller.response.dear;

import com.example.lettering.domain.sealingwax.enums.DesignType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UnreadMessageResponse {
    private boolean exist;
    private Long messageId;
    private Long sealingWaxId;
    private DesignType designType;

    public static UnreadMessageResponse of(boolean exist, Long messageId, Long sealingWaxId, DesignType designType) {
        return new UnreadMessageResponse(exist, messageId, sealingWaxId, designType);
    }
}
