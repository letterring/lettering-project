package com.example.lettering.controller.response.dear;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MessageReadCountResponse {
    private long readCount;
    private long unreadCount;

    public static MessageReadCountResponse of(MessageReadCountResponse messageReadCountResponse) {
        return new MessageReadCountResponse(messageReadCountResponse.getReadCount(), messageReadCountResponse.getUnreadCount());
    }
}
