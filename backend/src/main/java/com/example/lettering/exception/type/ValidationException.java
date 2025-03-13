package com.example.lettering.exception.type;

import com.example.lettering.exception.ExceptionCode;
import lombok.Getter;

@Getter
public class ValidationException extends RuntimeException {

    private final ExceptionCode exceptionCode;

    public ValidationException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }

    public ValidationException(String message, ExceptionCode exceptionCode) {
        super(message);
        this.exceptionCode = exceptionCode;
    }
}
