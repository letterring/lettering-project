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

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "letter_id", nullable = false)
    private Letter letter;
}