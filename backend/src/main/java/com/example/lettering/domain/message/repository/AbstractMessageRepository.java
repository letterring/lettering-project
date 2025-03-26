package com.example.lettering.domain.message.repository;

import com.example.lettering.domain.message.entity.AbstractMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface AbstractMessageRepository extends JpaRepository<AbstractMessage, Long>, AbstractMessageRepositoryCustom {
    Page<AbstractMessage> findBySender_IdOrderByConditionTimeDesc(Long senderId, Pageable pageable);

    //조건1. conditionTime이 현재시간보다 <=가 되어야함. 조건2. 안읽음 - 즐겨찾기 - 최신순 정렬
    @Query("SELECT m FROM AbstractMessage m " +
            "WHERE m.keyring.id = :keyringId " +
            "  AND (m.conditionType <> 'TIMECAPSULE' OR m.conditionTime <= :now) " +
            "ORDER BY m.opened ASC, m.favorite DESC, m.conditionTime DESC")
    Page<AbstractMessage> findByKeyringIdWithCondition(
            @Param("keyringId") Long keyringId,
            @Param("now") LocalDateTime now,
            Pageable pageable);
}