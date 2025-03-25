package com.example.lettering.controller;

import com.example.lettering.controller.request.CreatePostcardRequest;
import com.example.lettering.domain.message.service.PostcardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
@Tag(name = "Mesasge", description = "message 관련 API")
public class MessageController {

    private final PostcardService postcardService;

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
}