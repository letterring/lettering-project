package com.example.lettering.domain.keyring.repository;



import com.example.lettering.domain.keyring.entity.Keyring;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KeyringRepository extends JpaRepository<Keyring, Long>, KeyringRepositoryCustom {


}
