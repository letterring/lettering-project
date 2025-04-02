package com.example.lettering.controller.request.sender;

import com.example.lettering.domain.message.enums.ConditionType;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CreatePostcardRequest {
    // 필수
    @NotNull(message = "keyringId 필수입니다.")
    private Long keyringId;

    @NotNull(message = "sealingWaxId 필수입니다.")
    private Long sealingWaxId;

    @NotNull(message = "conditionType 필수입니다.")
    private ConditionType conditionType;

    @NotNull(message = "content 필수입니다.")
    private String content;

    //선택
    private LocalDateTime conditionTime;
    private String quizQuestion;
    private String quizHint;
    private String quizAnswer;
}
