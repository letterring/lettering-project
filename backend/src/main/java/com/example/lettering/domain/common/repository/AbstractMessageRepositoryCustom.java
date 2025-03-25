package com.example.lettering.domain.common.repository;

import com.example.lettering.domain.letter.enums.ConditionType;

import java.time.LocalDateTime;

public interface AbstractMessageRepositoryCustom {
    int countByKeyring(Long keyringId);
    int countByKeyringAndConditionType(Long keyringId, ConditionType conditionType);
    LocalDateTime findLastSentTimeByKeyring(Long keyringId);
}
