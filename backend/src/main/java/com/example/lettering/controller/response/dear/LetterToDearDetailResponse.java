package com.example.lettering.controller.response.dear;

import com.example.lettering.controller.response.sender.LetterImageResponse;
import com.example.lettering.domain.message.entity.Letter;
import com.example.lettering.domain.message.entity.LetterContent;
import com.example.lettering.domain.message.entity.LetterImage;
import com.example.lettering.domain.sealingwax.enums.DesignType;
import com.example.lettering.domain.user.enums.Font;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class LetterToDearDetailResponse {
    private Long id;
    private String nfcName;
    private String nickName;
    private List<String> letterContents;
    private List<LetterImageResponse> letterImages;
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

    public static LetterToDearDetailResponse fromEntity(Letter letter) {
        LetterToDearDetailResponse response = new LetterToDearDetailResponse();
        response.setId(letter.getId());
        response.setNfcName(letter.getKeyring().getNfcName());
        response.setNickName(letter.getSender().getUserNickname());

        response.setLetterContents(
                letter.getContents().stream()
                        .sorted(Comparator.comparing(LetterContent::getId))
                        .map(LetterContent::getText)
                        .collect(Collectors.toList())
        );

        response.setLetterImages(
                letter.getImages().stream()
                        .sorted(Comparator.comparing(LetterImage::getOrderIndex))
                        .map(img -> new LetterImageResponse(img.getId(), img.getImageLowUrl()))
                        .collect(Collectors.toList())
        );

        response.setConditionType(letter.getConditionType().toString());
        response.setConditionTime(letter.getConditionTime());
        response.setSentTime(letter.getSentTime());
        response.setFirstOpenedTime(letter.getFirstOpenedTime());
        response.setReplyText(letter.getReplyText());
        response.setReplySentTime(letter.getReplySentTime());
        response.setSealingWaxId(letter.getSealingWax().getId());
        response.setDesignType(letter.getSealingWax().getDesignType());
        response.setFont(letter.getFont());

        if (letter.getQuizInfo() != null) {
            response.setQuizQuestion(letter.getQuizInfo().getQuizQuestion());
            response.setQuizHint(letter.getQuizInfo().getQuizHint());
            response.setQuizAnswer(letter.getQuizInfo().getQuizAnswer());
        }

        return response;
    }
}
