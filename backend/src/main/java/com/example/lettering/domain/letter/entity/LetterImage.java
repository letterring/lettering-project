package com.example.lettering.domain.letter.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "letter_image")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LetterImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // S3 등에서 관리하는 이미지 URL
    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    // 어느 편지에 속하는지
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "letter_id", nullable = false)
    private Letter letter;
}