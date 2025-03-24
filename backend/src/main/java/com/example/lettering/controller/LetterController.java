package com.example.lettering.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/message/letters")
@RequiredArgsConstructor
public class LetterController {

    //private final LetterService letterService;

    /**
     * 편지 생성 API
     * json 편지 데이터와 함께 이미지 파일들 multipart/form-data로 받기
     */
//    @PostMapping
//    public ResponseEntity<LetterResponse> createLetter(
//            @RequestPart("letter") CreateLetterRequest letterRequest,
//            @RequestPart(value = "images", required = false) List<MultipartFile> imageFiles) {
//        try {
//            LetterResponse response = letterService.createLetter(letterRequest, imageFiles);
//            return ResponseEntity.ok(response);
//        } catch (IOException e) {
//            // 필요한 예외 처리를 추가하세요.
//            return ResponseEntity.status(500).build();
//        }
//    }
}
