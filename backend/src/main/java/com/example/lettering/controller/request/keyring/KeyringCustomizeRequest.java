package com.example.lettering.controller.request.keyring;

import lombok.Getter;
import java.util.List;

@Getter
public class KeyringCustomizeRequest {

    private List<KeyringInfo> keyrings;

    @Getter
    public static class KeyringInfo {
        private Long keyringId;
        private String nfcName;
        private String customMessage;
    }
}