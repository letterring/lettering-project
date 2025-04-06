package com.example.lettering.domain.message.repository;

import com.example.lettering.domain.message.entity.AbstractMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface AbstractMessageRepository extends JpaRepository<AbstractMessage, Long>, AbstractMessageRepositoryCustom {
    Page<AbstractMessage> findBySender_IdOrderByConditionTimeDesc(Long senderId, Pageable pageable);

    Page<AbstractMessage> findByKeyring_IdOrderByConditionTimeDesc(Long keyringId,Pageable pageable);

    //조건1. conditionTime이 현재시간보다 <=가 되어야함. 조건2. 안읽음 - 즐겨찾기 - 최신순 정렬
    @Query("SELECT m FROM AbstractMessage m " +
            "WHERE m.keyring.id = :keyringId " +
            "  AND (m.conditionType <> 'RESERVATION' OR m.conditionTime <= :now) " +
            "ORDER BY m.opened ASC, m.favorite DESC, m.conditionTime DESC")
    Page<AbstractMessage> findByKeyringIdWithCondition(
            @Param("keyringId") Long keyringId,
            @Param("now") LocalDateTime now,
            Pageable pageable);

    //조건1. conditionTime이 미래면 안됨 
    List<AbstractMessage> findByKeyringIdAndOpenedFalseAndConditionTimeLessThanEqualOrderByConditionTimeDesc(Long keyringId, LocalDateTime now);

    @Query("select m from AbstractMessage m " +
            "where m.keyring.id = :keyringId " +
            "and ((m.conditionType = 'RESERVATION' and m.conditionTime <= :now) " +
            "or (m.conditionType <> 'RESERVATION'))")
    List<AbstractMessage> findByKeyringIdAndCondition(@Param("keyringId") Long keyringId,
                                                      @Param("now") LocalDateTime now);
}