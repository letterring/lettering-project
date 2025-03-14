package com.example.lettering.util.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizInfo {
    private String quizQuestion;
    private String quizHint;
    private String quizAnswer;
}
