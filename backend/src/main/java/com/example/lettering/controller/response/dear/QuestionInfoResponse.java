package com.example.lettering.controller.response.dear;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuestionInfoResponse {
    private String quizQuestion;
    private String quizHint;
    private String quizAnswer;

    public static QuestionInfoResponse of(String quizQuestion, String quizHint, String quizAnswer) {
        return new QuestionInfoResponse(quizQuestion, quizHint, quizAnswer);
    }
}
