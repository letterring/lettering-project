package com.example.lettering.domain.letter.entity;

import com.example.lettering.domain.common.entity.AbstractMessage;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "letter")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Letter extends AbstractMessage {

    @OneToMany(mappedBy = "letter", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LetterContent> contents;

    // 편지의 여러 이미지 (LetterImage 엔티티와 연관, 순서 보장을 위해 OrderColumn 사용)
    @OneToMany(mappedBy = "letter", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderColumn(name = "order_index")
    private List<LetterImage> images;
}
