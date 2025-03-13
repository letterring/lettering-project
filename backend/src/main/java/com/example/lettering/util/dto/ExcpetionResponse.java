package com.example.lettering.util.dto;

import com.example.lettering.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExcpetionResponse {

    private int code;
    private String message;

    public static ExcpetionResponse of(ExceptionCode exceptionCode) {
        return ExcpetionResponse.builder()
                .code(exceptionCode.getCode())
                .message(exceptionCode.getMessage())
                .build();
    }
}
