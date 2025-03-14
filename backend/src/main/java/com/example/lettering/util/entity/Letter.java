package com.example.lettering.util.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "letter")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Letter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 작성 시각 (보낸 시간)
    @Column(name = "sent_time", nullable = false)
    private LocalDateTime sentTime;

    // 퀴즈 정보 (공통 Embeddable)
    @Embedded
    private QuizInfo quizInfo;

    // 실링왁스 (외래키로 SealingWax 엔티티 참조)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sealing_wax_id", nullable = false)
    private SealingWax sealingWax;

    // 조건 타입 (예약 전송, 타임캡슐)
    @Enumerated(EnumType.STRING)
    @Column(name = "condition_type", nullable = false)
    private ConditionType conditionType;

    // 조건 시간 (예약 전송 시간 또는 타임캡슐 개봉 예정 시간)
    @Column(name = "condition_time")
    private LocalDateTime conditionTime;

    // 최초 오픈 시간 (여러 명에게 전달 시 최초 오픈 시간; 누가 열었는지는 모름)
    @Column(name = "first_opened_time")
    private LocalDateTime firstOpenedTime;

    // 즐겨찾기 여부
    @Column(name = "favorite", nullable = false)
    private Boolean favorite;

    // 작성자 (보내는 사람)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    // 편지의 글 (단락별로 여러 개 저장)
    @OneToMany(mappedBy = "letter", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LetterContent> contents;

    // 여러 이미지 (LetterImage 엔티티 사용)
    @OneToMany(mappedBy = "letter", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LetterImage> images;
}
