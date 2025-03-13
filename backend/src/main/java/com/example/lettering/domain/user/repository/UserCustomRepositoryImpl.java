package com.example.lettering.domain.user.repository;

import com.example.lettering.domain.user.entity.User;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import static com.example.lettering.domain.user.entity.QUser.user;

@Repository
public class UserCustomRepositoryImpl implements UserCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public UserCustomRepositoryImpl(EntityManager entityManager) {
        this.jpaQueryFactory = new JPAQueryFactory(entityManager);
    }

    public Optional<User> findById(int id) {

        return Optional.ofNullable(jpaQueryFactory
                .selectFrom(user)
                .where(user.id.eq(id))
                .fetchOne());
    }
}
