package com.example.lettering.domain.keyring.repository;

import com.example.lettering.domain.keyring.entity.KeyringDesign;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KeyringDesignRepository extends JpaRepository<KeyringDesign, Long> {
}
