package com.example.lettering.controller.response;

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
        PostcardToDearDetailResponse postcardToDearDetailResponse = new PostcardToDearDetailResponse();
        postcardToDearDetailResponse.setId(postcard.getId());
        postcardToDearDetailResponse.setNfcName(postcard.getKeyring().getNfcName());
        postcardToDearDetailResponse.setNickName(postcard.getSender().getUserNickname());
        postcardToDearDetailResponse.setContent(postcard.getContent());
        postcardToDearDetailResponse.setImageUrl(postcard.getImageLowUrl());
        postcardToDearDetailResponse.setConditionType(postcard.getConditionType().toString());
        postcardToDearDetailResponse.setConditionTime(postcard.getConditionTime());
        postcardToDearDetailResponse.setSentTime(postcard.getSentTime());
        postcardToDearDetailResponse.setFirstOpenedTime(postcard.getFirstOpenedTime());
        postcardToDearDetailResponse.setReplyText(postcard.getReplyText());
        postcardToDearDetailResponse.setReplySentTime(postcard.getReplySentTime());
        postcardToDearDetailResponse.setSealingWaxId(postcard.getSealingWax().getId());
        postcardToDearDetailResponse.setDesignType(postcard.getSealingWax().getDesignType());
        postcardToDearDetailResponse.setFont(postcard.getFont());

        if (postcard.getQuizInfo() != null) {
            postcardToDearDetailResponse.setQuizQuestion(postcard.getQuizInfo().getQuizQuestion());
            postcardToDearDetailResponse.setQuizHint(postcard.getQuizInfo().getQuizHint());
            postcardToDearDetailResponse.setQuizAnswer(postcard.getQuizInfo().getQuizAnswer());
        }

        return postcardToDearDetailResponse;
    }
}
