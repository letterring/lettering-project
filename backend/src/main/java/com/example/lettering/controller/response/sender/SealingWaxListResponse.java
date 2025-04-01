package com.example.lettering.controller.response.sender;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SealingWaxListResponse {
    private List<SealingWaxResponse> sealingWaxes;

    public static SealingWaxListResponse of(List<SealingWaxResponse> sealingWaxes) {
        SealingWaxListResponse sealingWaxListResponse = new SealingWaxListResponse();
        sealingWaxListResponse.setSealingWaxes(sealingWaxes);
        return sealingWaxListResponse;
    }
}
