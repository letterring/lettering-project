package com.example.lettering.domain.message.repository;

import com.example.lettering.domain.message.entity.Postcard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostcardRepository extends JpaRepository<Postcard, Long> {
}