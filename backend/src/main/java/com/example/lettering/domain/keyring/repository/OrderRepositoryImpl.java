package com.example.lettering.domain.keyring.repository;

import com.example.lettering.domain.keyring.entity.QOrder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class OrderRepositoryImpl implements OrderRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Long getMaxOrderNumber() {
        QOrder order = QOrder.order;

        return queryFactory
                .select(order.orderNumber.max())
                .from(order)
                .fetchOne();
    }
}
