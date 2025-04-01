package com.example.lettering.domain.message.entity;

import com.example.lettering.controller.request.sender.CreateLetterRequest;
import com.example.lettering.domain.keyring.entity.Keyring;
import com.example.lettering.domain.message.enums.ConditionType;
import com.example.lettering.domain.sealingwax.entity.SealingWax;
import com.example.lettering.domain.user.entity.QuizInfo;
import com.example.lettering.domain.user.entity.User;
import com.example.lettering.domain.user.enums.Font;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "letter")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Letter extends AbstractMessage {

    @OneToMany(mappedBy = "letter", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LetterContent> contents = new ArrayList<>();

    @OneToMany(mappedBy = "letter", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderColumn(name = "order_index")
    private List<LetterImage> images = new ArrayList<>();

    public static Letter fromDto(CreateLetterRequest createLetterRequest, User sender, Keyring keyring, SealingWax sealingWax, Font font,
                                 List<LetterContent> contents, List<LetterImage> images) {
        Letter letter = new Letter();
        letter.sender = sender;
        letter.keyring = keyring;
        letter.sealingWax = sealingWax;
        letter.conditionType = createLetterRequest.getConditionType();
        letter.sentTime = LocalDateTime.now();
        letter.conditionTime = LocalDateTime.now();
        letter.favorite = false;
        letter.opened = false;
        letter.font = font;

        if (createLetterRequest.getConditionType() == ConditionType.RESERVATION || createLetterRequest.getConditionType() == ConditionType.TIMECAPSULE) {
            letter.conditionTime = createLetterRequest.getConditionTime();
        } else {
            letter.conditionTime = LocalDateTime.now();
        }

        letter.favorite = false;
        letter.opened = false;

        if(createLetterRequest.getQuizQuestion() != null) {
            QuizInfo quizInfo = new QuizInfo();
            quizInfo.setQuizQuestion(createLetterRequest.getQuizQuestion());
            quizInfo.setQuizHint(createLetterRequest.getQuizHint());
            quizInfo.setQuizAnswer(createLetterRequest.getQuizAnswer());
            letter.quizInfo = quizInfo;
        }
        
        // 양방향 연관관계 설정: 편지 내용
        if (contents != null) {
            for (LetterContent content : contents) {
                content.setLetter(letter);
                letter.getContents().add(content);
            }
        }

        // 양방향 연관관계 설정: 편지 이미지
        if (images != null) {
            for (LetterImage image : images) {
                image.setLetter(letter);
                letter.getImages().add(image);
            }
        }
        return letter;
    }
}
