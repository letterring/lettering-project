package com.example.lettering.controller.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KeyringDesignRequest {
    private String designName;
    private Long price;
    private String description;
}
