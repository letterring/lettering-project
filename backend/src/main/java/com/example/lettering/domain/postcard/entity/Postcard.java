package com.example.lettering.domain.postcard.entity;

import com.example.lettering.domain.letter.enums.ConditionType;
import com.example.lettering.domain.user.entity.QuizInfo;
import com.example.lettering.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

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

    // 작성자 (엽서 작성자)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User author;

    // 보낸 시각
    @Column(name = "sent_time", nullable = false)
    private LocalDateTime sentTime;

    // 엽서 이미지 URL (S3 저장 주소)
    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    // 퀴즈 정보 (공통 Embeddable)
    @Embedded
    private QuizInfo quizInfo;

    // CONTENT (3000 BYTE)
    @Column(name = "content", nullable = false, length = 3000)
    private String content;

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
}
