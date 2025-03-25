package com.example.lettering.domain.message.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "letter_content")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LetterContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 어느 편지에 속하는 글인지
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "letter_id", nullable = false)
    private Letter letter;

    // 글 내용 (단락별로 저장; 필요시 MySQL ALTER TABLE 로 VARCHAR 길이 증대)
    @Column(name = "text", nullable = false, length = 3000)
    private String text;
}