package com.example.lettering.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ExceptionCode {
    // Controller에서 검증시 발생할 수 있는 예외 작성
    VALIDATION_ERROR(HttpStatus.BAD_REQUEST, "사용자 입력 값이 검증에 실패했습니다.", 1001),
    SESSION_USER_NOT_FOUND(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다.", 1002),

    // Service에서 비즈니스 로직 처리시 발생할 수 있는 예외 작성
    BUSINESS_ERROR(HttpStatus.CONFLICT, "비즈니스 로직에서 예외가 발생했습니다.", 2001),
    EMAIL_DUPLICATED(HttpStatus.CONFLICT, "이미 등록된 이메일입니다.", 2002),
    USER_NICKNAME_DUPLICATED(HttpStatus.CONFLICT, "이미 사용 중인 닉네임입니다.", 2003),
    EMAIL_NOT_FOUND(HttpStatus.NOT_FOUND, "이메일을 찾을 수 없습니다.", 2004),
    INVALID_PASSWORD(HttpStatus.UNAUTHORIZED, "비밀번호가 일치하지 않습니다.", 2005),
    SALT_NOT_FOUND(HttpStatus.INTERNAL_SERVER_ERROR, "비밀번호 복호화를 위한 Salt가 존재하지 않습니다.", 2006),
    OAUTH_EMAIL_NOT_FOUND(HttpStatus.BAD_REQUEST, "OAuth 제공자로부터 이메일 정보를 가져올 수 없습니다.", 2007),
    UNAUTHORIZED_ACCESS(HttpStatus.FORBIDDEN, "접근 권한이 없습니다.", 2008),
    INVALID_IMAGE_FORMAT(HttpStatus.BAD_REQUEST, "이미지 파일 포멧이 옳지 않습니다", 2009),
    MESSAGE_NO_IMAGE(HttpStatus.NOT_FOUND, "해당하는 이미지가 없습니다.", 2010),
    INVALID_MESSAGE_TYPE(HttpStatus.BAD_REQUEST, "메시지 타입이 옳지 않습니다", 2011),

    // Repository에서 데이터베이스 조작시 발생할 수 있는 예외 작성
    DATABASE_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "데이터베이스 조작 과정에서 예외가 발생했습니다.", 3001),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당하는 사용자가 존재하지 않습니다.", 3002),
    KEYRING_NOT_FOUND(HttpStatus.NOT_FOUND, "해당하는 키링이 존재하지 않습니다.", 3003),
    SEALINGWAX_NOT_FOUND(HttpStatus.NOT_FOUND, "해당하는 실링왁스가 존재하지 않습니다.", 3004),
    KEYRING_NOT_ENOUGH(HttpStatus.BAD_REQUEST, "구매 가능한 키링이 부족합니다.", 3005),
    DESIGN_NOT_FOUND(HttpStatus.NOT_FOUND, "선택한 디자인을 찾을 수 없습니다.", 3006),
    MESSAGE_NOT_FOUND(HttpStatus.NOT_FOUND, "선택된 메시지(편지 또는 우편)을 찾을 수 없습니다.", 3007),
    ORDER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 주문을 찾을 수 없습니다.", 3008),

    // 외부 API 사용시 발생할 수 있는 예외 작성
    EXTERNAL_API_ERROR(HttpStatus.BAD_GATEWAY, "외부 API를 호출하는 과정에서 예외가 발생했습니다.", 4001),
    S3_UPLOAD_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "S3 업로드 중 오류가 발생했습니다.", 4002),
    S3_DELETE_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "S3 파일 삭제 중 오류가 발생했습니다.", 4003),
    S3_URL_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "유효하지 않은 S3 URL 오류가 발생했습니다.", 4004);

    private final String message;
    private final int code;
    private final HttpStatus httpStatus;

    ExceptionCode(HttpStatus httpStatus, String message, int code) {
        this.message = message;
        this.httpStatus = httpStatus;
        this.code = code;
    }
}
