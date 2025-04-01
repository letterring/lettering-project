package com.example.lettering.controller.response.dear;

import com.example.lettering.domain.message.entity.Postcard;
import com.example.lettering.domain.sealingwax.enums.DesignType;
import com.example.lettering.domain.user.enums.Font;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PostcardToDearDetailResponse {
    private Long id;
    private String nfcName;           // 받는 사람 이름
    private String nickName;        // 보낸 사람의 별명
    private String content;
    private String imageUrl;
    private String conditionType;
    private LocalDateTime conditionTime;
    private LocalDateTime sentTime;
    private LocalDateTime firstOpenedTime;
    private String replyText;
    private LocalDateTime replySentTime;
    private Long sealingWaxId;
    private DesignType designType;
    private Font font;
    private String quizQuestion;
    private String quizHint;
    private String quizAnswer;

    public static PostcardToDearDetailResponse fromEntity(Postcard postcard) {
        PostcardToDearDetailResponse response = new PostcardToDearDetailResponse();
        response.setId(postcard.getId());
        response.setNfcName(postcard.getKeyring().getNfcName());
        response.setNickName(postcard.getSender().getUserNickname());
        response.setContent(postcard.getContent());
        response.setImageUrl(postcard.getImageHighUrl());
        response.setConditionType(postcard.getConditionType().toString());
        response.setConditionTime(postcard.getConditionTime());
        response.setSentTime(postcard.getSentTime());
        response.setFirstOpenedTime(postcard.getFirstOpenedTime());
        response.setReplyText(postcard.getReplyText());
        response.setReplySentTime(postcard.getReplySentTime());
        response.setSealingWaxId(postcard.getSealingWax().getId());
        response.setDesignType(postcard.getSealingWax().getDesignType());
        response.setFont(postcard.getFont());

        if (postcard.getQuizInfo() != null) {
            response.setQuizQuestion(postcard.getQuizInfo().getQuizQuestion());
            response.setQuizHint(postcard.getQuizInfo().getQuizHint());
            response.setQuizAnswer(postcard.getQuizInfo().getQuizAnswer());
        }

        return response;
    }
}
