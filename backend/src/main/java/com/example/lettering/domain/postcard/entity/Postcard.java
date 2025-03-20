package com.example.lettering.domain.postcard.entity;

import com.example.lettering.domain.letter.entity.LetterContent;
import com.example.lettering.domain.letter.entity.LetterImage;
import com.example.lettering.domain.letter.enums.ConditionType;
import com.example.lettering.domain.sealingwax.entity.SealingWax;
import com.example.lettering.domain.user.entity.QuizInfo;
import com.example.lettering.domain.user.entity.User;
import com.example.lettering.util.entity.Keyring;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "postcard")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Postcard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    // 편지 받는 사람
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "keyring_id", nullable = false)
    private Keyring keyring;

    // 디자인 선택
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sealing_wax_id", nullable = false)
    private SealingWax sealingWax;

    @Column(nullable = false)
    private String content;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    // 조건 타입 (예약 전송, 타임캡슐, 퀴즈)
    @Enumerated(EnumType.STRING)
    @Column(name = "condition_type", nullable = false)
    private ConditionType conditionType;

    // 퀴즈 정보 (공통 Embeddable)
    @Embedded
    private QuizInfo quizInfo;

    // 조건 시간 (예약 전송 시간 또는 타임캡슐 개봉 예정 시간)
    @Column(name = "condition_time")
    private LocalDateTime conditionTime;

    // 작성 시각 (보낸 시간)
    @Column(name = "sent_time", nullable = false)
    private LocalDateTime sentTime;

    // 받은 사람 편지 읽었는지 안읽었는지
    @Column(name = "open_Postcard", nullable = false)
    private Boolean openPostcard;

    // 이 사람의 오픈 시간 (편지 오픈 기준, 받는 사람이 편지 열었을때 상세 API 요청 -> 이때 서비스 로직에서 openTime 할당)
    @Column(name = "first_opened_time")
    private LocalDateTime firstOpenedTime;

    // 즐겨찾기 여부(받는 사람 기준), 키링 가진 사람에게 편지 목록 정렬해서 보여줄때 사용
    @Column(name = "favorite", nullable = false)
    private Boolean favorite;

    // 이모지 타입 (enum: EmojiScore), 우선순위 밀린 상태
//    @Enumerated(EnumType.STRING)
//    @Column(name = "emoji_type", nullable = false)
//    private EmojiScore emojiType;

    // 답장 텍스트
    @Column(name = "reply_text", columnDefinition = "TEXT", nullable = false)
    private String replyText;

    // 답장 보낸 시간
    @Column(name = "reply_sent_time", nullable = false)
    private LocalDateTime replySentTime;
}
