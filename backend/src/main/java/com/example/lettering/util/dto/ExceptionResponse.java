package com.example.lettering.util.dto;

import com.example.lettering.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
public class ExceptionResponse {

    private int code;
    private int status;
    private String message;

    public static ExceptionResponse of(ExceptionCode exceptionCode) {
        return ExceptionResponse.builder()
                .code(exceptionCode.getCode())
                .message(exceptionCode.getMessage())
                .build();
    }

    public static ExceptionResponse of(ExceptionCode code, String customMessage) {
        return new ExceptionResponse(code.getCode(), code.getHttpStatus().value(), customMessage);
    }
}
