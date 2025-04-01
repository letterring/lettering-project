package com.example.lettering.controller.response.sender;

import com.example.lettering.domain.message.entity.AbstractMessage;
import com.example.lettering.domain.sealingwax.enums.DesignType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class SenderMessageSummaryResponse {
    private Long id;
    private String repliedName; // 받는 사람 이름 = nfc_name
    private LocalDateTime conditionTime;
    private boolean replied;     // 답장여부
    private Long sealingWaxId;
    private DesignType designType;

    public static SenderMessageSummaryResponse fromEntity(AbstractMessage abstractMessage) {
        SenderMessageSummaryResponse senderMessageSummaryResponse = new SenderMessageSummaryResponse();
        senderMessageSummaryResponse.setId(abstractMessage.getId());
        senderMessageSummaryResponse.setRepliedName(abstractMessage.getKeyring().getNfcName());
        senderMessageSummaryResponse.setConditionTime(abstractMessage.getConditionTime());
        senderMessageSummaryResponse.setReplied(abstractMessage.getReplyText() != null);
        senderMessageSummaryResponse.setSealingWaxId(abstractMessage.getSealingWax().getId());
        senderMessageSummaryResponse.setDesignType(abstractMessage.getSealingWax().getDesignType());
        return senderMessageSummaryResponse;
    }
}
