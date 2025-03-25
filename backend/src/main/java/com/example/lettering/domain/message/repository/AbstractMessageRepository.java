package com.example.lettering.domain.message.repository;

import com.example.lettering.domain.message.entity.AbstractMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AbstractMessageRepository extends JpaRepository<AbstractMessage, Long> {
    Page<AbstractMessage> findBySender_IdOrderByConditionTimeDesc(Long senderId, Pageable pageable);
}