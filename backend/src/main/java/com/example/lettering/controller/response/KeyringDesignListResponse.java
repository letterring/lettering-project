package com.example.lettering.controller.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class KeyringDesignListResponse {
    private List<KeyringDesignResponse> designs;

    public static KeyringDesignListResponse from(List<KeyringDesignResponse> designResponses) {
        return new KeyringDesignListResponse(designResponses);
    }
}
