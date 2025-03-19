package com.example.lettering.controller.request;

import com.example.lettering.domain.letter.enums.ConditionType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 구조 예시, 추후 수정 필요
 * */

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class CreateLetterRequest {
    private List<String> contents;
    private ConditionType conditionType;
    private LocalDateTime conditionTime;
    private Boolean favorite;
    private Long senderId;
}
