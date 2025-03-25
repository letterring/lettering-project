package com.example.lettering.domain.common.repository;

import com.example.lettering.domain.common.entity.AbstractMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AbstractMessageRepository extends JpaRepository<AbstractMessage, Long>, AbstractMessageRepositoryCustom {
}
