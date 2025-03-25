package com.example.lettering.controller.request;

import com.example.lettering.domain.message.enums.ConditionType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CreatePostcardRequest {
    // 필수
    private Long keyringId;
    private Long sealingWaxId;
    private ConditionType conditionType;
    private String content;

    //선택
    private LocalDateTime conditionTime;
    private String quizQuestion;
    private String quizHint;
    private String quizAnswer;
}
