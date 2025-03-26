package com.example.lettering.domain.message.service;

import com.example.lettering.controller.response.DearMessageSummaryResponse;
import com.example.lettering.controller.response.SenderMessageSummaryResponse;
import com.example.lettering.domain.message.entity.AbstractMessage;
import com.example.lettering.domain.message.repository.AbstractMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MessageServiceImpl implements MessageService {

    private final AbstractMessageRepository abstractMessageRepository;

    @Override
    public List<SenderMessageSummaryResponse> getMessagesBySender(Long senderId, int page) {
        PageRequest pageable = PageRequest.of(page, 5);
        Page<AbstractMessage> pageResult = abstractMessageRepository.findBySender_IdOrderByConditionTimeDesc(senderId, pageable);
        return pageResult.stream()
                .map(SenderMessageSummaryResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<DearMessageSummaryResponse> getMessagesToDear(Long keyringId, int page) {
        PageRequest pageable = PageRequest.of(page, 5);
        Page<AbstractMessage> messagePage = abstractMessageRepository
                .findByKeyring_IdAndConditionTimeLessThanEqualOrderByOpenedAscFavoriteDescConditionTimeDesc(
                        keyringId, LocalDateTime.now(), pageable);
        if (messagePage.isEmpty()) {
            return List.of();
        }
        return messagePage.stream()
                .map(DearMessageSummaryResponse::fromEntity)
                .collect(Collectors.toList());
    }
}
