package com.example.lettering.domain.keyring.repository;

import com.example.lettering.domain.keyring.entity.Keyring;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface KeyringRepository extends JpaRepository<Keyring, Long>, KeyringRepositoryCustom {
    List<Keyring> findAllByOwnerId(Long ownerId);
    List<Keyring> findAllByOwnerIdOrderByIsFavoriteDescIdAsc(Long userId);
}
