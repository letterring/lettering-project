package com.example.lettering.domain.message.service;

import com.example.lettering.controller.response.DearMessageSummaryResponse;
import com.example.lettering.controller.response.SenderMessageSummaryResponse;

import java.util.List;

public interface MessageService {
    List<SenderMessageSummaryResponse> getMessagesBySender(Long senderId, int page);

    List<DearMessageSummaryResponse> getMessagesToDear(Long keyringId, int page);

    void createReply(Long messageId, String replyText);

    public String getHighQualityImageUrl(Long messageId, int orderIndex);
}
