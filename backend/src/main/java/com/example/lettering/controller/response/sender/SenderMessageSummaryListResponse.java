package com.example.lettering.controller.response.sender;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SenderMessageSummaryListResponse {
    private List<SenderMessageSummaryResponse> senderMessageSummaryList;

    public static SenderMessageSummaryListResponse of(List<SenderMessageSummaryResponse> senderMessageSummaryList) {
        SenderMessageSummaryListResponse senderMessageSummaryListResponse = new SenderMessageSummaryListResponse();
        senderMessageSummaryListResponse.setSenderMessageSummaryList(senderMessageSummaryList);
        return senderMessageSummaryListResponse;
    }
}
