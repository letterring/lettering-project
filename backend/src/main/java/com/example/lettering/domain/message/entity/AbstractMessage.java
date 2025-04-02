package com.example.lettering.domain.message.entity;

import com.example.lettering.domain.keyring.entity.Keyring;
import com.example.lettering.domain.message.enums.ConditionType;
import com.example.lettering.domain.sealingwax.entity.SealingWax;
import com.example.lettering.domain.user.entity.QuizInfo;
import com.example.lettering.domain.user.entity.User;
import com.example.lettering.domain.user.enums.Font;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "abstract_message")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public abstract class AbstractMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", nullable = false)
    protected User sender;

    // 편지를 받는 사람
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "keyring_id", nullable = false)
    protected Keyring keyring;

    // 디자인 선택
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sealing_wax_id", nullable = false)
    protected SealingWax sealingWax;

    // 폰트 선택
    @Enumerated(EnumType.STRING)
    @Column(name = "font", nullable = false)
    protected Font font;

    // 조건 타입 (예약 전송, 타임캡슐, 퀴즈 등)
    @Enumerated(EnumType.STRING)
    @Column(name = "condition_type", nullable = false)
    protected ConditionType conditionType;

    // 퀴즈 정보 (공통 Embeddable)
    @Embedded
    protected QuizInfo quizInfo;

    // 조건 시간 (예약 전송 또는 타임캡슐 개봉 예정 시간)
    @Column(name = "condition_time", nullable = false)
    protected LocalDateTime conditionTime;

    // 작성 시각 (보낸 시간)
    @Column(name = "sent_time", nullable = false)
    protected LocalDateTime sentTime;

    // 편지 오픈 시간 (받는 사람이 편지 열었을때 상세 API 요청 시간 기준 -> 이때 서비스 로직에서 OpenedTime 할당)
    @Column(name = "first_opened_time")
    protected LocalDateTime firstOpenedTime;

    // 즐겨찾기 여부 (받는 사람 기준)
    @Column(name = "favorite", nullable = false)
    protected Boolean favorite;

    // 답장 텍스트
    @Column(name = "reply_text", columnDefinition = "TEXT")
    protected String replyText;

    // 답장 보낸 시간
    @Column(name = "reply_sent_time")
    protected LocalDateTime replySentTime;

    // 받은 편지 읽음 여부 (Postcard의 open, Letter의 open)
    @Column(name = "opened", nullable = false)
    protected Boolean opened;

    public void updateReply(String replyText) {
        this.replyText = replyText;
        this.replySentTime = LocalDateTime.now();
    }

    public void toggleFavorite() {
        this.favorite = !this.favorite;
    }
}