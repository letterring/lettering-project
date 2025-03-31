package com.example.lettering.domain.message.entity;

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

    @Column(name = "order_index", nullable = false)
    private int orderIndex;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "letter_id", nullable = false)
    private Letter letter;

    public static LetterImage fromImageUrl(String imageUrl, int orderIndex) {
        return LetterImage.builder()
                .imageUrl(imageUrl)
                .orderIndex(orderIndex)
                .build();
    }
}