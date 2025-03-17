package com.example.lettering.domain.user.repository;

import com.example.lettering.domain.user.entity.Salt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaltRepository extends JpaRepository<Salt, Long> {
}