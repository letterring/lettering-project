package com.example.lettering.controller.request.sender;

import com.example.lettering.domain.message.enums.ConditionType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
    @NotNull(message = "keyringId 필수입니다.")
    private Long keyringId;

    @NotNull(message = "sealingWaxId 필수입니다.")
    private Long sealingWaxId;

    @NotNull(message = "conditionType 필수입니다.")
    private ConditionType conditionType;

    @NotNull(message = "contents 필수입니다.")
    @Size(min = 1, message = "최소한 1개 이상의 content가 필요합니다.")
    private List<String> contents;

    //선택
    private LocalDateTime conditionTime;
    private String quizQuestion;
    private String quizHint;
    private String quizAnswer;
}
