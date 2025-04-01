package com.example.lettering.exception;

import com.example.lettering.exception.type.BusinessException;
import com.example.lettering.exception.type.DbException;
import com.example.lettering.exception.type.ExternalApiException;
import com.example.lettering.exception.type.ValidationException;
import com.example.lettering.util.dto.ExceptionResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Objects;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ExceptionResponse> handleValidationException(ValidationException ex) {

        return ResponseEntity
                .status(ex.getExceptionCode().getHttpStatus())
                .body(ExceptionResponse.of(ex.getExceptionCode()));
    }

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ExceptionResponse> handleBusinessException(BusinessException ex) {

        return ResponseEntity
                .status(ex.getExceptionCode().getHttpStatus())
                .body(ExceptionResponse.of(ex.getExceptionCode()));
    }

    @ExceptionHandler(DbException.class)
    public ResponseEntity<ExceptionResponse> handleDbException(DbException ex) {

        return ResponseEntity
                .status(ex.getExceptionCode().getHttpStatus())
                .body(ExceptionResponse.of(ex.getExceptionCode()));
    }

    @ExceptionHandler(ExternalApiException.class)
    public ResponseEntity<ExceptionResponse> handleExternalApiException(ExternalApiException ex) {

        return ResponseEntity
                .status(ex.getExceptionCode().getHttpStatus())
                .body(ExceptionResponse.of(ex.getExceptionCode()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        String message = Objects.requireNonNull(ex.getBindingResult().getFieldError()).getDefaultMessage();

        return ResponseEntity
                .status(ExceptionCode.VALIDATION_ERROR.getHttpStatus())
                .body(ExceptionResponse.of(ExceptionCode.VALIDATION_ERROR, message));
    }
}