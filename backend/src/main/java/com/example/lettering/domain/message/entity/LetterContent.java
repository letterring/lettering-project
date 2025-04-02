package com.example.lettering.domain.message.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    // 양방향 연관관계 설정을 위한 setter
    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "letter_id", nullable = false)
    @JsonIgnore
    private Letter letter;

    // 글 내용 (단락별로 저장; 필요시 MySQL ALTER TABLE 로 VARCHAR 길이 증대)
    @Column(name = "text", nullable = false, length = 3000)
    private String text;

    public static LetterContent fromText(String text) {
        return LetterContent.builder()
                .text(text)
                .build();
    }
}