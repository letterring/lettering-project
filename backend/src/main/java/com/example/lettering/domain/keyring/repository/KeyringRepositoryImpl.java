package com.example.lettering.domain.keyring.repository;


import com.example.lettering.domain.keyring.entity.Keyring;

import com.example.lettering.domain.keyring.entity.QKeyring;
import com.example.lettering.domain.keyring.entity.QKeyringDesign;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class KeyringRepositoryImpl implements KeyringRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Keyring> findAvailableKeyrings(int quantity) {
        QKeyring keyring = QKeyring.keyring;

        return queryFactory
                .selectFrom(keyring)
                .where(keyring.isPurchase.eq(false))
                .orderBy(keyring.id.asc()) // ✅ 가장 오래된 키링부터 할당
                .limit(quantity) // ✅ 필요한 개수만큼 가져오기
                .fetch();
    }

    @Override
    public long countAvailableKeyrings() {
        QKeyring keyring = QKeyring.keyring;

        return queryFactory
                .selectFrom(keyring)
                .where(keyring.isPurchase.eq(false))
                .fetchCount();
    }
}