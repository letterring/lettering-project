package com.example.lettering.domain.user.repository;

import com.example.lettering.domain.user.entity.User;
import com.example.lettering.domain.user.enums.Provider;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findAllByEmail(String email);

    boolean existsByUserNickname(String userNickname);

    boolean existsByEmail(String email);
    Optional<User> findByEmailAndProvider(String email, Provider provider);



}
