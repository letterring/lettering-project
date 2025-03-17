package com.example.lettering.domain.user.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "salt")
@Getter
@NoArgsConstructor
public class Salt {

    @Id
    @Column(name = "user_id")
    private Long userId;

    @Column(nullable = false, length = 255)
    private String salt;

    public Salt(Long userId, String salt) {
        this.userId = userId;
        this.salt = salt;
    }
}

