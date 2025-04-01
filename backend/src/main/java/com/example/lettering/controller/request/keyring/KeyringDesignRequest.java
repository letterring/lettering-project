package com.example.lettering.controller.request.keyring;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KeyringDesignRequest {
    private String designName;
    private Long price;
    private String description;
}
