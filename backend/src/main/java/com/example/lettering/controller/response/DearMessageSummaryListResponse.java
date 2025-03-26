package com.example.lettering.controller.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DearMessageSummaryListResponse {
    private List<DearMessageSummaryResponse> dearMessageSummaryResponses;

    public static DearMessageSummaryListResponse of(List<DearMessageSummaryResponse> dearMessageSummaryResponses) {
        DearMessageSummaryListResponse dearMessageSummaryListResponse = new DearMessageSummaryListResponse();
        dearMessageSummaryListResponse.setDearMessageSummaryResponses(dearMessageSummaryResponses);
        return dearMessageSummaryListResponse;
    }
}
