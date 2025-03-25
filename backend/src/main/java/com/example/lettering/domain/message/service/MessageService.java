package com.example.lettering.domain.message.service;

import com.example.lettering.controller.response.SenderMessageSummaryResponse;

import java.util.List;

public interface MessageService {
    List<SenderMessageSummaryResponse> getMessagesBySender(Long senderId, int page);
}
