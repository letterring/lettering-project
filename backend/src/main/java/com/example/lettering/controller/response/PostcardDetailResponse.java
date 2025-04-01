package com.example.lettering.controller.response;

import com.example.lettering.domain.message.entity.Postcard;
import com.example.lettering.domain.sealingwax.enums.DesignType;
import com.example.lettering.domain.user.enums.Font;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

//추후 이름 변경 필요 PostcardBySenderDetail 로 변경 고민중

@Getter
@Setter
public class PostcardDetailResponse {
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

    public static PostcardDetailResponse fromEntity(Postcard postcard) {
        PostcardDetailResponse postcardDetailResponse = new PostcardDetailResponse();
        postcardDetailResponse.setId(postcard.getId());
        postcardDetailResponse.setNfcName(postcard.getKeyring().getNfcName());
        postcardDetailResponse.setNickName(postcard.getSender().getUserNickname());
        postcardDetailResponse.setContent(postcard.getContent());
        postcardDetailResponse.setImageUrl(postcard.getImageHighUrl());
        postcardDetailResponse.setConditionType(postcard.getConditionType().toString());
        postcardDetailResponse.setConditionTime(postcard.getConditionTime());
        postcardDetailResponse.setSentTime(postcard.getSentTime());
        postcardDetailResponse.setFirstOpenedTime(postcard.getFirstOpenedTime());
        postcardDetailResponse.setReplyText(postcard.getReplyText());
        postcardDetailResponse.setReplySentTime(postcard.getReplySentTime());
        postcardDetailResponse.setOpened(postcard.getOpened());
        postcardDetailResponse.setSealingWaxId(postcard.getSealingWax().getId());
        postcardDetailResponse.setDesignType(postcard.getSealingWax().getDesignType());
        postcardDetailResponse.setFont(postcard.getFont());

        if (postcard.getQuizInfo() != null) {
            postcardDetailResponse.setQuizQuestion(postcard.getQuizInfo().getQuizQuestion());
            postcardDetailResponse.setQuizHint(postcard.getQuizInfo().getQuizHint());
            postcardDetailResponse.setQuizAnswer(postcard.getQuizInfo().getQuizAnswer());
        }

        return postcardDetailResponse;
    }
}
