package com.example.lettering.domain.message.entity;

import com.example.lettering.controller.request.CreatePostcardRequest;
import com.example.lettering.domain.keyring.entity.Keyring;
import com.example.lettering.domain.message.enums.ConditionType;
import com.example.lettering.domain.sealingwax.entity.SealingWax;
import com.example.lettering.domain.user.entity.QuizInfo;
import com.example.lettering.domain.user.entity.User;
import com.example.lettering.domain.user.enums.Font;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "postcard")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Postcard extends AbstractMessage {

    @Column(name = "content", nullable = false, length = 3000)
    private String content;

    @Column(name = "image_high_url", nullable = false)
    private String imageHighUrl;

    @Column(name = "image_low_url", nullable = false)
    private String imageLowUrl;

    public static Postcard fromDto(CreatePostcardRequest createPostcardRequest, User sender, Keyring keyring, SealingWax sealingWax, String imageHighUrl, String imageLowUrl, Font font) {
        Postcard postcard = new Postcard();
        postcard.sender = sender;
        postcard.keyring = keyring;
        postcard.sealingWax = sealingWax;
        postcard.conditionType = createPostcardRequest.getConditionType();
        postcard.sentTime = LocalDateTime.now();
        postcard.conditionTime = LocalDateTime.now();
        postcard.favorite = false;
        postcard.opened = false;
        postcard.font = font;

        if (createPostcardRequest.getConditionType() == ConditionType.RESERVATION || createPostcardRequest.getConditionType() == ConditionType.TIMECAPSULE) {
            postcard.conditionTime = createPostcardRequest.getConditionTime();
        } else {
            postcard.conditionTime = LocalDateTime.now();
        }

        postcard.favorite = false;
        postcard.opened = false;

        if(createPostcardRequest.getQuizQuestion() != null) {
            QuizInfo quizInfo = new QuizInfo();
            quizInfo.setQuizQuestion(createPostcardRequest.getQuizQuestion());
            quizInfo.setQuizHint(createPostcardRequest.getQuizHint());
            quizInfo.setQuizAnswer(createPostcardRequest.getQuizAnswer());
            postcard.quizInfo = quizInfo;
        }

        postcard.content = createPostcardRequest.getContent();
        postcard.imageHighUrl = imageHighUrl;
        postcard.imageLowUrl = imageLowUrl;
        return postcard;
    }

    public void markAsOpened() {
        if (!this.opened) {
            this.opened = true;
            this.firstOpenedTime = LocalDateTime.now();
        }
    }

    public void resetAsUnread() {
        this.opened = false;
        this.firstOpenedTime = null;
        this.replyText = null;
        this.replySentTime = null;
    }
}