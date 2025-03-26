package com.example.lettering.domain.message.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class KeyringLastSentTime {
    private Long keyringId;
    private LocalDateTime lastSentTime;
}
