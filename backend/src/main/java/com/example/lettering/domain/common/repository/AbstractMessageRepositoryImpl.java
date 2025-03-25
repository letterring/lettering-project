package com.example.lettering.domain.common.repository;

import com.example.lettering.domain.common.entity.QAbstractMessage;
import com.example.lettering.domain.letter.enums.ConditionType;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

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
}
