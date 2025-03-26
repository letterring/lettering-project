package com.example.lettering.controller.response;

import com.example.lettering.domain.message.entity.AbstractMessage;
import com.example.lettering.domain.sealingwax.enums.DesignType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class DearMessageSummaryResponse {
    private Long id;
    private LocalDateTime conditionTime;
    private boolean replied;
    private Long sealingWaxId;
    private Boolean favorite;
    private DesignType designType;
    private Boolean opened;

    public static DearMessageSummaryResponse fromEntity(AbstractMessage message) {
        DearMessageSummaryResponse dearMessageSummaryResponse = new DearMessageSummaryResponse();
        dearMessageSummaryResponse.setId(message.getId());
        dearMessageSummaryResponse.setConditionTime(message.getConditionTime());
        dearMessageSummaryResponse.setReplied(message.getReplySentTime() != null);
        dearMessageSummaryResponse.setSealingWaxId(message.getSealingWax().getId());
        dearMessageSummaryResponse.setFavorite(message.getFavorite());
        dearMessageSummaryResponse.setDesignType(message.getSealingWax().getDesignType());
        dearMessageSummaryResponse.setOpened(message.getOpened());
        return dearMessageSummaryResponse;
    }
}
