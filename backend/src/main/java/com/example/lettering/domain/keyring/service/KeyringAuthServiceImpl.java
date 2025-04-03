package com.example.lettering.domain.keyring.service;

import com.example.lettering.domain.keyring.entity.Keyring;
import com.example.lettering.domain.keyring.repository.KeyringRepository;
import com.example.lettering.exception.ExceptionCode;
import com.example.lettering.exception.type.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KeyringAuthServiceImpl implements KeyringAuthService {

    private final KeyringRepository keyringRepository;

    @Override
    public boolean isTextValid(Long keyringId, String text) {
        Keyring keyring = keyringRepository.findById(keyringId)
                .orElseThrow(() -> new BusinessException(ExceptionCode.KEYRING_NOT_FOUND));

        return text.equals(keyring.getCustomMessage());
    }
}