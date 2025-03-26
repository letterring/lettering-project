package com.example.lettering.controller.request;

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
    private List<String> contents;

    private ConditionType conditionType;

    private LocalDateTime conditionTime;

    private Boolean favorite;

    private Long senderId;

    private String quizQuestion;
    private String quizHint;
    private String quizAnswer;

    private List<Long> receiverKeyringIds;
}
