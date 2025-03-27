package com.example.lettering.domain.message.repository;

import com.example.lettering.domain.message.dto.KeyringLastSentTime;
import com.example.lettering.domain.message.enums.ConditionType;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface AbstractMessageRepositoryCustom {
    int countByKeyring(Long keyringId);
    int countByKeyringAndConditionType(Long keyringId, ConditionType conditionType);
    LocalDateTime findLastSentTimeByKeyring(Long keyringId);
    List<KeyringLastSentTime> findLastSentTimesByKeyringIds(List<Long> keyringIds);

    Map<Long, Integer> countMessagesByKeyringIds(List<Long> keyringIds);
    Map<Long, Integer> countMessagesByKeyringIdsAndConditionType(List<Long> keyringIds, ConditionType conditionType);
}
