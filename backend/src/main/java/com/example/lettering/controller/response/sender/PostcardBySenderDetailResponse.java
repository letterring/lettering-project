package com.example.lettering.controller.response.sender;

import com.example.lettering.domain.message.entity.Postcard;
import com.example.lettering.domain.sealingwax.enums.DesignType;
import com.example.lettering.domain.user.enums.Font;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

//추후 이름 변경 필요 PostcardBySenderDetail 로 변경 고민중

@Getter
@Setter
public class PostcardBySenderDetailResponse {
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
    private Boolean opened;
    private Long sealingWaxId;
    private DesignType designType;
    private Font font;
    private String quizQuestion;
    private String quizHint;
    private String quizAnswer;

    public static PostcardBySenderDetailResponse fromEntity(Postcard postcard) {
        PostcardBySenderDetailResponse response = new PostcardBySenderDetailResponse();
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
        response.setOpened(postcard.getOpened());
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
