package com.example.lettering.controller.request.sender;

import com.example.lettering.domain.message.enums.ConditionType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class CreateLetterRequest {
    // 필수
    private Long keyringId;
    private Long sealingWaxId;
    private ConditionType conditionType;
    private List<String> contents;

    //선택
    private LocalDateTime conditionTime;
    private String quizQuestion;
    private String quizHint;
    private String quizAnswer;
}
