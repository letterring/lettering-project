package com.example.lettering.domain.keyring.service;

import com.example.lettering.domain.keyring.entity.KeyringDesign;
import com.example.lettering.domain.keyring.repository.KeyringDesignRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class KeyringService {

    private final KeyringDesignRepository keyringDesignRepository;

    // ✅ 모든 키링 디자인 조회
    public List<KeyringDesign> getAllKeyringDesigns() {
        return keyringDesignRepository.findAll();
    }
}
