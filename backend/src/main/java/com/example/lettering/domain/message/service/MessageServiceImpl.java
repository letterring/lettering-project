package com.example.lettering.domain.message.service;

import com.example.lettering.controller.response.dear.DearMessageSummaryResponse;
import com.example.lettering.controller.response.dear.MessageReadCountResponse;
import com.example.lettering.controller.response.sender.SenderMessageSummaryResponse;
import com.example.lettering.controller.response.dear.UnreadMessageResponse;
import com.example.lettering.domain.message.entity.AbstractMessage;
import com.example.lettering.domain.message.entity.Letter;
import com.example.lettering.domain.message.entity.Postcard;
import com.example.lettering.domain.message.repository.AbstractMessageRepository;
import com.example.lettering.exception.ExceptionCode;
import com.example.lettering.exception.type.BusinessException;
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
@Transactional
public class MessageServiceImpl implements MessageService {

    private final AbstractMessageRepository abstractMessageRepository;

    @Override
    public List<SenderMessageSummaryResponse> getMessagesBySender(Long senderId, int page) {
        PageRequest pageable = PageRequest.of(page, 7);
        Page<AbstractMessage> pageResult = abstractMessageRepository.findBySender_IdOrderByConditionTimeDesc(senderId, pageable);
        return pageResult.stream()
                .map(SenderMessageSummaryResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<SenderMessageSummaryResponse> getMessagesByKeyring(Long keyringId, int page) {
        PageRequest pageable = PageRequest.of(page, 7);
        Page<AbstractMessage> pageResult = abstractMessageRepository
                .findByKeyring_IdOrderByConditionTimeDesc(keyringId, pageable);
        return pageResult.stream()
                .map(SenderMessageSummaryResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<DearMessageSummaryResponse> getMessagesToDear(Long keyringId, int page) {
        PageRequest pageable = PageRequest.of(page, 7);
        Page<AbstractMessage> messagePage = abstractMessageRepository
                .findByKeyringIdWithCondition(
                        keyringId, LocalDateTime.now(), pageable);
        if (messagePage.isEmpty()) {
            return List.of();
        }
        return messagePage.stream()
                .map(DearMessageSummaryResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public MessageReadCountResponse getMessageReadCount(Long keyringId, LocalDateTime now) {
        List<AbstractMessage> messages = abstractMessageRepository.findByKeyringIdAndCondition(keyringId, now);

        long readCount = messages.stream().filter(AbstractMessage::getOpened).count();
        long unreadCount = messages.size() - readCount;

        return new MessageReadCountResponse(readCount, unreadCount);
    }

    @Override
    public void createReply(Long messageId, String replyText) {
        AbstractMessage message = abstractMessageRepository.findById(messageId)
                .orElseThrow(() -> new BusinessException(ExceptionCode.DATABASE_ERROR));
        message.updateReply(replyText);
    }

    @Override
    public String getHighQualityImageUrl(Long messageId, int orderIndex) {
        AbstractMessage message = abstractMessageRepository.findById(messageId)
                .orElseThrow(() -> new BusinessException(ExceptionCode.MESSAGE_NOT_FOUND));

        if (message instanceof Postcard postcard) {
            return postcard.getImageHighUrl();
        } else if (message instanceof Letter letter) {
            if (letter.getImages() != null && !letter.getImages().isEmpty()) {
                return letter.getImages().get(orderIndex).getImageHighUrl();
            } else {
                throw new BusinessException(ExceptionCode.MESSAGE_NO_IMAGE);
            }
        } else {
            throw new BusinessException(ExceptionCode.INVALID_MESSAGE_TYPE);
        }
    }

    @Override
    public void toggleFavorite(Long messageId) {
        AbstractMessage message = abstractMessageRepository.findById(messageId)
                .orElseThrow(() -> new BusinessException(ExceptionCode.MESSAGE_NOT_FOUND));

        message.toggleFavorite();
    }

    @Override
    public UnreadMessageResponse getLatestUnreadMessage(Long keyringId) {
        LocalDateTime now = LocalDateTime.now();
        List<AbstractMessage> messages = abstractMessageRepository
                .findByKeyringIdAndOpenedFalseAndConditionTimeLessThanEqualOrderByConditionTimeDesc(keyringId, now);

        if (messages == null || messages.isEmpty()) {
            return new UnreadMessageResponse(false, null, null, null, null);
        }

        AbstractMessage latest = messages.get(0);

        return UnreadMessageResponse.of(true, latest.getId(), latest.getSealingWax().getId(), latest.getSealingWax().getDesignType(), latest.getConditionType());
    }

    // 추후 토큰 인증시 해당 토큰 -> keyringId 찾기, 이후 message값이랑 같은지 검증
//    private boolean validateMessageOwnership(Long messageId, Long tokenKeyringId) {
//        AbstractMessage message = abstractMessageRepository.findById(messageId)
//                .orElseThrow(() -> new BusinessException(ExceptionCode.MESSAGE_NOT_FOUND));
//
//        if (!message.getKeyring().getId().equals(tokenKeyringId)) {
//            throw new BusinessException(ExceptionCode.KEYRING_NOT_FOUND);
//        }
//        return true;
//    }
}
