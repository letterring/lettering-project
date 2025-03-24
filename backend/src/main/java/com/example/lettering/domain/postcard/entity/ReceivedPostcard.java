package com.example.lettering.domain.postcard.entity;

import com.example.lettering.domain.keyring.entity.Keyring;
import com.example.lettering.domain.letter.enums.EmojiScore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "received_postcard")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReceivedPostcard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 어느 키링을 통해 전달된 엽서 답장인지 (외래키)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "keyring_id", nullable = false)
    private Keyring keyring;

    // 답장이 달린 엽서 (외래키)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "postcard_id", nullable = false)
    private Postcard postcard;

    // 즐겨찾기 여부
    @Column(name = "favorite", nullable = false)
    private Boolean favorite;

    // 답장 텍스트
    @Column(name = "reply_text", columnDefinition = "TEXT", nullable = false)
    private String replyText;

    // 이모지 타입 (enum)
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
