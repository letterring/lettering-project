package com.example.lettering.domain.message.service;

import com.example.lettering.controller.response.dear.DearMessageSummaryResponse;
import com.example.lettering.controller.response.dear.MessageReadCountResponse;
import com.example.lettering.controller.response.sender.SenderMessageSummaryResponse;
import com.example.lettering.controller.response.dear.UnreadMessageResponse;

import java.time.LocalDateTime;
import java.util.List;

public interface MessageService {
    List<SenderMessageSummaryResponse> getMessagesBySender(Long senderId, int page);

    List<SenderMessageSummaryResponse> getMessagesByKeyring(Long keyringId, int page);

    List<DearMessageSummaryResponse> getMessagesToDear(Long keyringId, int page);

    MessageReadCountResponse getMessageReadCount(Long keyringId, LocalDateTime now);

    void createReply(Long messageId, String replyText);

    String getHighQualityImageUrl(Long messageId, int orderIndex);

    void toggleFavorite(Long messageId);

    UnreadMessageResponse getLatestUnreadMessage(Long keyringId);
}
