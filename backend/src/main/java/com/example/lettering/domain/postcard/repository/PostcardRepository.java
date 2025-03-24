package com.example.lettering.domain.postcard.repository;

import com.example.lettering.domain.postcard.entity.Postcard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostcardRepository extends JpaRepository<Postcard, Long> {
}