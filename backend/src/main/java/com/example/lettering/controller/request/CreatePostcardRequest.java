package com.example.lettering.controller.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreatePostcardRequest {
    // 필요한 필드 (예시: sender, keyring, sealingWax 등은 실제 서비스 로직에 맞게 추가)
    private Long senderId;
    private Long keyringId;
    private Long sealingWaxId;
    // 기타 AbstractMessage 관련 필드도 필요하면 추가 (조건, sentTime 등)

    // Postcard 고유 필드
    private String content;
}
