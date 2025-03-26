package com.example.lettering.domain.message.repository;

import com.example.lettering.domain.message.entity.AbstractMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface AbstractMessageRepository extends JpaRepository<AbstractMessage, Long>, AbstractMessageRepositoryCustom {
    Page<AbstractMessage> findBySender_IdOrderByConditionTimeDesc(Long senderId, Pageable pageable);

    //조건1. conditionTime이 현재시간보다 <=가 되어야함. 조건2. 안읽음 - 즐겨찾기 - 최신순 정렬
    Page<AbstractMessage> findByKeyring_TagCodeAndConditionTimeLessThanEqualOrderByOpenedAscFavoriteDescConditionTimeDesc(
            String tagCode,
            LocalDateTime now,
            Pageable pageable);
}