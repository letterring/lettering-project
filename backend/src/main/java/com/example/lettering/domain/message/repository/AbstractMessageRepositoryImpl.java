package com.example.lettering.domain.message.repository;

import com.example.lettering.domain.message.dto.KeyringLastSentTime;
import com.example.lettering.domain.message.entity.QAbstractMessage;
import com.example.lettering.domain.message.enums.ConditionType;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class AbstractMessageRepositoryImpl implements AbstractMessageRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    QAbstractMessage message = QAbstractMessage.abstractMessage;

    @Override
    public int countByKeyring(Long keyringId) {
        Long count = queryFactory
                .select(message.count())
                .from(message)
                .where(message.keyring.id.eq(keyringId))
                .fetchOne();

        return count != null ? count.intValue() : 0;
    }

    @Override
    public int countByKeyringAndConditionType(Long keyringId, ConditionType conditionType) {
        Long count = queryFactory
                .select(message.count())
                .from(message)
                .where(
                        message.keyring.id.eq(keyringId),
                        message.conditionType.eq(conditionType)
                )
                .fetchOne();

        return count != null ? count.intValue() : 0;
    }

    @Override
    public LocalDateTime findLastSentTimeByKeyring(Long keyringId) {
        return queryFactory
                .select(message.sentTime.max())
                .from(message)
                .where(message.keyring.id.eq(keyringId))
                .fetchOne();
    }

    @Override
    public List<KeyringLastSentTime> findLastSentTimesByKeyringIds(List<Long> keyringIds) {
        List<Tuple> results = queryFactory
                .select(
                        message.keyring.id,
                        message.sentTime.max()
                )
                .from(message)
                .where(message.keyring.id.in(keyringIds))
                .groupBy(message.keyring.id)
                .fetch();

        return results.stream()
                .map(tuple -> new KeyringLastSentTime(
                        tuple.get(message.keyring.id),
                        tuple.get(message.sentTime.max())
                ))
                .toList();
    }

    @Override
    public Map<Long, Integer> countMessagesByKeyringIds(List<Long> keyringIds) {
        return queryFactory
                .select(message.keyring.id, message.count())
                .from(message)
                .where(message.keyring.id.in(keyringIds))
                .groupBy(message.keyring.id)
                .fetch()
                .stream()
                .collect(Collectors.toMap(
                        tuple -> tuple.get(message.keyring.id),
                        tuple -> tuple.get(message.count()).intValue()
                ));
    }

    @Override
    public Map<Long, Integer> countMessagesByKeyringIdsAndConditionType(List<Long> keyringIds, ConditionType conditionType) {
        return queryFactory
                .select(message.keyring.id, message.count())
                .from(message)
                .where(
                        message.keyring.id.in(keyringIds),
                        message.conditionType.eq(conditionType)
                )
                .groupBy(message.keyring.id)
                .fetch()
                .stream()
                .collect(Collectors.toMap(
                        tuple -> tuple.get(message.keyring.id),
                        tuple -> tuple.get(message.count()).intValue()
                ));
    }
}
