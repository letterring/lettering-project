package com.example.lettering.domain.keyring.repository;

import com.example.lettering.domain.keyring.entity.Keyring;

import java.util.List;

public interface KeyringRepositoryCustom {
    List<Keyring> findAvailableKeyrings(int quantity); // ✅ 구매 가능한 키링 리스트 조회
    long countAvailableKeyrings(); // ✅ 구매 가능한 키링 개수 조회
}