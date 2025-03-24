package com.example.lettering.util.entity;

import com.example.lettering.domain.keyring.entity.Keyring;
import com.example.lettering.domain.letter.entity.Letter;
import com.example.lettering.domain.letter.enums.EmojiScore;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "received_letter")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReceivedLetter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 어느 키링을 통해 전달된 답장인지 (외래키)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "keyring_id", nullable = false)
    private Keyring keyring;

    // 답장이 달린 편지 (외래키)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "letter_id", nullable = false)
    private Letter letter;

    // 즐겨찾기 여부
    @Column(name = "favorite", nullable = false)
    private Boolean favorite;

    // 답장 텍스트
    @Column(name = "reply_text", columnDefinition = "TEXT", nullable = false)
    private String replyText;

    // 이모지 타입 (enum: EmojiScore)
    @Enumerated(EnumType.STRING)
    @Column(name = "emoji_type", nullable = false)
    private EmojiScore emojiType;

    // 답장 보낸 시간
    @Column(name = "reply_sent_time", nullable = false)
    private LocalDateTime replySentTime;

    // 이 사람의 오픈 시간 (편지 오픈 기준)
    @Column(name = "open_time")
    private LocalDateTime openTime;
}
