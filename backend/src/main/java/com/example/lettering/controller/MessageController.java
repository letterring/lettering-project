package com.example.lettering.controller;

import com.example.lettering.controller.request.CreatePostcardRequest;
import com.example.lettering.domain.message.service.PostcardService;
import com.example.lettering.exception.ExceptionCode;
import com.example.lettering.exception.type.BusinessException;
import com.example.lettering.exception.type.ExternalApiException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
@Tag(name = "Mesasge", description = "메시지 관련 API")
public class MessageController {

    private final PostcardService postcardService;
    private final MessageService messageService;
    //private final LetterService letterService;

    @Operation(summary = "엽서 작성 API", description = "엽서를 작성하여 등록합니다.")
    @PostMapping(path = "/postcards",consumes = "multipart/form-data")
    public ResponseEntity<Map<String, Object>> createPostcard(
            @RequestPart("postcard") CreatePostcardRequest createPostcardRequest,
            @RequestPart("image") MultipartFile imageFile,
            HttpSession session) throws IOException {

//        Long senderId = (Long) session.getAttribute("userId");
        Long senderId = 1L;
        Long postcardId = postcardService.createPostcard(createPostcardRequest, imageFile, senderId);

        Map<String, Object> result = new HashMap<>();
        result.put("id", postcardId);
        result.put("success", true);
        return ResponseEntity.ok(result);
    }

    /**
     * 편지 생성 API
     * json 편지 데이터와 함께 이미지 파일들 multipart/form-data로 받기
     */
//    @PostMapping("/letters")
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

    @Operation(summary = "메시지 목록 조회", description = "현재 사용자가 작성한 모든 메시지를 conditionTime 내림차순 정렬 후, 기준 인덱스(-3~+3)를 중심으로 최대 7개의 목록 정보를 반환합니다. 각 메시지에는 받는 사람의 NFC 이름, conditionTime, replyText 여부, 그리고 sealingWax의 id가 포함됩니다.")
    @GetMapping
    public ResponseEntity<List<MessageSummaryResponse>> getMessages(
            HttpSession session,
            @RequestParam(name = "index", defaultValue = "0") int index) {
        // HTTPSession에서 senderId를 가져옴 (예시로 1L 사용)
        Long senderId = (Long) session.getAttribute("userId");
        if (senderId == null) {
            throw new BusinessException(ExceptionCode.USER_NOT_FOUND);
        }
        List<MessageSummaryResponse> responses = messageService.getMessagesBySender(senderId, index);
        return ResponseEntity.ok(responses);
    }
}