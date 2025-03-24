package com.example.lettering.domain.postcard.entity;

import com.example.lettering.controller.request.CreatePostcardRequest;
import com.example.lettering.domain.common.entity.AbstractMessage;
import com.example.lettering.domain.keyring.entity.Keyring;
import com.example.lettering.domain.letter.enums.ConditionType;
import com.example.lettering.domain.sealingwax.entity.SealingWax;
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
public class Postcard extends AbstractMessage {

    @Column(nullable = false)
    private String content;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    public static Postcard fromDto(CreatePostcardRequest request, User sender, Keyring keyring, SealingWax sealingWax, String imageUrl) {
        Postcard postcard = new Postcard();
        postcard.sender = sender;
        postcard.keyring = keyring;
        postcard.sealingWax = sealingWax;
        postcard.conditionType = request.getConditionType();
        postcard.sentTime = LocalDateTime.now();
        postcard.conditionTime = LocalDateTime.now();
        postcard.favorite = false;
        postcard.opened = false;

        if (request.getConditionType() == ConditionType.RESERVATION || request.getConditionType() == ConditionType.TIMECAPSULE) {
            postcard.conditionTime = request.getConditionTime();
        } else {
            postcard.conditionTime = LocalDateTime.now();
        }

        postcard.favorite = false;
        postcard.opened = false;

        if(request.getQuizQuestion() != null) {
            QuizInfo quizInfo = new QuizInfo();
            quizInfo.setQuizQuestion(request.getQuizQuestion());
            quizInfo.setQuizHint(request.getQuizHint());
            quizInfo.setQuizAnswer(request.getQuizAnswer());
            postcard.quizInfo = quizInfo;
        }

        postcard.content = request.getContent();
        postcard.imageUrl = imageUrl;
        return postcard;
    }
}