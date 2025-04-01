package com.example.lettering.domain.message.service;

import com.example.lettering.controller.response.dear.DearMessageSummaryResponse;
import com.example.lettering.controller.response.sender.SenderMessageSummaryResponse;
import com.example.lettering.controller.response.dear.UnreadMessageResponse;

import java.util.List;

public interface MessageService {
    List<SenderMessageSummaryResponse> getMessagesBySender(Long senderId, int page);

    List<DearMessageSummaryResponse> getMessagesToDear(Long keyringId, int page);

    void createReply(Long messageId, String replyText);

    String getHighQualityImageUrl(Long messageId, int orderIndex);

    public UnreadMessageResponse getLatestUnreadMessage(Long keyringId);
}
