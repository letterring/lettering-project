package com.example.lettering.controller.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DearMessageSummaryListResponse {
    private List<DearMessageSummaryResponse> dearMessagesSummaryList;

    public static DearMessageSummaryListResponse of(List<DearMessageSummaryResponse> dearMessageSummaryResponses) {
        DearMessageSummaryListResponse dearMessageSummaryListResponse = new DearMessageSummaryListResponse();
        dearMessageSummaryListResponse.setDearMessagesSummaryList(dearMessageSummaryResponses);
        return dearMessageSummaryListResponse;
    }
}
