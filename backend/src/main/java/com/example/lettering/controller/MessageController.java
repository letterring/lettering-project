package com.example.lettering.controller;

import com.example.lettering.controller.request.dear.ImageDownloadRequest;
import com.example.lettering.controller.request.sender.CreateLetterRequest;
import com.example.lettering.controller.request.sender.CreatePostcardRequest;
import com.example.lettering.controller.response.dear.*;
import com.example.lettering.controller.response.keyring.KeyringFilterListResponse;
import com.example.lettering.controller.response.sender.LetterBySenderDetailResponse;
import com.example.lettering.controller.response.sender.PostcardBySenderDetailResponse;
import com.example.lettering.controller.response.sender.SenderMessageSummaryListResponse;
import com.example.lettering.controller.response.sender.SenderMessageSummaryResponse;
import com.example.lettering.domain.keyring.service.KeyringService;
import com.example.lettering.domain.keyring.service.KeyringSessionService;
import com.example.lettering.domain.message.service.LetterService;
import com.example.lettering.domain.message.service.MessageService;
import com.example.lettering.domain.message.service.PostcardService;
import com.example.lettering.exception.ExceptionCode;
import com.example.lettering.exception.type.BusinessException;
import com.example.lettering.exception.type.ValidationException;
import com.example.lettering.util.FileMetaUtil;
import com.example.lettering.util.SessionUtil;
import com.example.lettering.util.dto.BooleanResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.http.protocol.HTTP;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpHeaders;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
@Tag(name = "Messasge", description = "메시지 관련 API")
public class MessageController {

    private final PostcardService postcardService;
    private final MessageService messageService;
    private final LetterService letterService;
    private final KeyringService keyringService;
    private final KeyringSessionService sessionService;
    private final SessionUtil sessionUtil;

    @Value("${validation.keyring.enabled:true}")
    private boolean isKeyringValidationEnabled;

    @Operation(summary = "고화질 이미지 API", description = "해당 메시지(우편 또는 엽서)의 고화질 이미지를 얻습니다.")
    @GetMapping("/highimage")
    public ResponseEntity<Map<String, String>> getHighQualityImage(   @RequestParam("messageId") Long messageId,
                                                                      @RequestParam(value = "index", defaultValue = "0") int index, HttpSession session)  {

        String imageUrl = messageService.getHighQualityImageUrl(messageId, index);
        return ResponseEntity.ok(Map.of("imageHighUrl", imageUrl));
    }

    @Operation(summary = "엽서 작성 API", description = "엽서를 작성하여 등록합니다.")
    @PostMapping(path = "/postcards",consumes = "multipart/form-data")
    public ResponseEntity<Map<String, Object>> createPostcard(
            @Valid @RequestPart("postcard") CreatePostcardRequest createPostcardRequest,
            @RequestPart("image") MultipartFile imageFile, HttpSession session) throws IOException {

        Long userId = Objects.requireNonNull((Long) session.getAttribute("userId"));

        Long postcardId = postcardService.createPostcard(createPostcardRequest, imageFile, userId);

        Map<String, Object> result = new HashMap<>();
        result.put("id", postcardId);
        result.put("success", true);
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "편지 작성 API", description = "편지를 작성하여 등록합니다.")
    @PostMapping(path = "/letters",consumes = "multipart/form-data")
    public ResponseEntity<Map<String, Object>> createLetter(
            @Valid @RequestPart("letter") CreateLetterRequest createLetterRequest,
            @RequestPart("images") List<MultipartFile> imageFiles, HttpSession session) throws IOException {

        Long userId = Objects.requireNonNull((Long) session.getAttribute("userId"));

        Long letterId = letterService.createLetter(createLetterRequest, imageFiles, userId);

        Map<String, Object> result = new HashMap<>();
        result.put("id", letterId);
        result.put("success", true);
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "보낸 사람 기준 메시지 목록 조회", description = "현재 사용자가 작성한 모든 메시지를 conditionTime 내림차순 정렬 후 제공합니다.")
    @GetMapping("/sender")
    public ResponseEntity<SenderMessageSummaryListResponse> getMessagesBySender(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "keyringId", required = false) Long keyringId, HttpSession session) {

        Long userId = Objects.requireNonNull((Long) session.getAttribute("userId"));

        List<SenderMessageSummaryResponse> senderMessageSummaryResponseList;
        if (keyringId != null) {
            senderMessageSummaryResponseList = messageService.getMessagesByKeyring(keyringId, page);
        } else {
            senderMessageSummaryResponseList = messageService.getMessagesBySender(userId, page);
        }

        return ResponseEntity.ok(SenderMessageSummaryListResponse.of(senderMessageSummaryResponseList));
    }

    @Operation(summary = "보낸 사람 기준 엽서 상세 조회", description = "path variable로 전달된 messageId에 해당하는 엽서 상세 정보를 반환합니다. (favorite 제외)")
    @GetMapping("/postcards/sender/{messageId}")
    public ResponseEntity<PostcardBySenderDetailResponse> getPostcardBySenderDetail(
            @PathVariable("messageId") Long messageId) {

        return ResponseEntity.ok(postcardService.getPostcardDetail(messageId));
    }

    @Operation(summary = "보낸 사람 기준 편지 상세 조회", description = "path variable로 전달된 messageId에 해당하는 편지 상세 정보를 반환합니다.")
    @GetMapping("/letters/sender/{messageId}")
    public ResponseEntity<LetterBySenderDetailResponse> getLetterBySenderDetail(
            @PathVariable("messageId") Long messageId) {

        return ResponseEntity.ok(letterService.getLetterBySenderDetail(messageId));
    }

    @Operation(summary = "받는 사람 기준 메시지 목록 조회", description = "안읽은순, 즐겨찾기순, 최신순으로 정렬합니다.")
    @GetMapping("/dear")
    public ResponseEntity<DearMessageSummaryListResponse> getMessagesToDear(
            @RequestParam(name = "page", defaultValue = "0") int page,
            HttpSession session) {
        Long keyringId = isKeyringValidationEnabled ? Objects.requireNonNull((Long) session.getAttribute("keyringId")) : 19L;

        return ResponseEntity.ok(DearMessageSummaryListResponse.of(messageService.getMessagesToDear(keyringId, page)));
    }

    @Operation(summary = "받은 편지 읽음/안읽음 개수 조회",
            description = "요청 파라미터 keyringId에 해당하는 메시지 중, ConditionType이 RESERVATION이고 conditionTime이 현재 이후인 예약된 편지를 제외한 후, opened 상태에 따라 읽은 편지와 안읽은 편지의 개수를 반환합니다.")
    @GetMapping("/dear/readcount")
    public ResponseEntity<MessageReadCountResponse> getMessageReadCount(HttpSession session) {
        Long keyringId = isKeyringValidationEnabled ? Objects.requireNonNull((Long) session.getAttribute("keyringId")) : 19L;

        return ResponseEntity.ok(MessageReadCountResponse.of(messageService.getMessageReadCount(keyringId, LocalDateTime.now())));
    }

    @Operation(summary = "받은 사람 기준 엽서 상세 조회", description = "path variable로 전달된 messageId에 해당하는 엽서 상세 정보를 반환합니다.")
    @GetMapping("/postcards/dear/{messageId}")
    public ResponseEntity<PostcardToDearDetailResponse> getPostcardToDearDetail(
            @PathVariable("messageId") Long messageId) {

        return ResponseEntity.ok(postcardService.getPostcardToDearDetail(messageId));
    }

    @Operation(summary = "받은 사람 기준 편지 상세 조회", description = "path variable로 전달된 messageId에 해당하는 편지 상세 정보를 반환합니다.")
    @GetMapping("/letters/dear/{messageId}")
    public ResponseEntity<LetterToDearDetailResponse> getLetterToDearDetail(
            @PathVariable("messageId") Long messageId) {

        return ResponseEntity.ok(letterService.getLetterToDearDetail(messageId));
    }

    @Operation(summary = "받은 사람 기준 엽서 이미지 다운로드", description = "엽서 이미지를 다운받을 수 있습니다.")
    @PostMapping("/postcards/dear/image")
    public ResponseEntity<byte[]> downloadPostcardImage(@RequestBody ImageDownloadRequest imageDownloadRequest, HttpSession session) {
        String imageUrl = imageDownloadRequest.getImageUrl();

        byte[] imageBytes = postcardService.downloadImageFromS3(imageUrl);

        MediaType contentType = FileMetaUtil.resolveContentType(imageUrl);
        String fileName = FileMetaUtil.generateFileName("postcard", imageUrl);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(contentType);
        headers.setContentDisposition(ContentDisposition.builder("attachment")
                .filename(fileName)
                .build());

        return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
    }

    @Operation(summary = "엽서 읽지 않음 상태로 재설정",
            description = "path vairable로 전달된 messageId의 opened와 first_opened_time 초기화합니다.")
    @PatchMapping("/unread/backoffice/{messageId}")
    public ResponseEntity<BooleanResponse> resetMessageAsUnread(
            @PathVariable("messageId") Long messageId) {
        postcardService.resetMessageAsUnread(messageId);

        return ResponseEntity.ok(new BooleanResponse(true));
    }

    @Operation(summary = "메시지(우편 또는 엽서) 답장 작성", description = "받는 사람이 답장 작성시 사용하는 API 입니다.")
    @PatchMapping("/reply/{messageId}")
    public ResponseEntity<BooleanResponse> createReply(
            @PathVariable("messageId") Long messageId,
            @RequestBody CreateReplyRequest createReplyRequest) {

        messageService.createReply(messageId, createReplyRequest.getReplyText());
        return ResponseEntity.ok(new BooleanResponse(true));
    }

    @Operation(summary = "받은 메시지 즐겨찾기 토글",
            description = "메시지의 즐겨찾기 상태를 토글합니다. 현재 상태가 true이면 false로, false이면 true로 변경합니다. (로그인 없이 keyringId로 검증)")
    @PatchMapping("/favorite/{messageId}")
    public ResponseEntity<BooleanResponse> toggleFavorite(
            @PathVariable("messageId") Long messageId) {

        messageService.toggleFavorite(messageId);
        return ResponseEntity.ok(new BooleanResponse(true));
    }

    @Operation(summary = "최근 안읽은 메시지 여부 조회", description = "메시지 여부 조회 및 정보 반환")
    @GetMapping("/unread")
    public ResponseEntity<UnreadMessageResponse> getUnreadMessage(HttpSession session)  {
        Long keyringId = isKeyringValidationEnabled ? Objects.requireNonNull((Long) session.getAttribute("keyringId")) : 19L;

        return ResponseEntity.ok(messageService.getLatestUnreadMessage(keyringId));
    }

    @Operation(summary = "질문 정보 조회", description = "특정 메세지의 Quiz 정보 반환")
    @GetMapping("/dear/quiz/{messageId}")
    public ResponseEntity<QuestionInfoResponse> getMessageQuestion(@PathVariable Long messageId) {
        return ResponseEntity.ok(messageService.getMessageQuestionInfo(messageId));
    }

    @Operation(summary = "보낸 사람 기준 키링 필터",
            description = "세션의 userId(즉, ownerId)와 일치하는 keyring의 id와 nfcName을 반환합니다.")
    @GetMapping("/filter")
    public ResponseEntity<KeyringFilterListResponse> filterKeyringsByOwner(HttpSession session) {
        Long userId = Objects.requireNonNull((Long) session.getAttribute("userId"));

        return ResponseEntity.ok(KeyringFilterListResponse.of(keyringService.getKeyringsByOwner(userId)));
    }

    /**
     * 💌 키링 세션 기반 메시지 조회 API
     *
     * Authorization 헤더에 포함된 세션 토큰을 검증하고,
     * 해당 키링 ID에 대한 메시지 목록을 반환합니다.
     *
     * @return DearMessageSummaryListResponse - 메시지 목록
     */
//    @GetMapping("/dear")
//    public ResponseEntity<DearMessageSummaryListResponse> getDearMessages(
//            @RequestHeader("Authorization") String authHeader,
//            HttpServletRequest request
//    ) {
//        Long keyringId = sessionUtil.extractValidKeyringId(authHeader, request);
//
//        var messages = messageService.getMessagesToDear(keyringId, 0);
//
//        return ResponseEntity.ok(
//                DearMessageSummaryListResponse.of(messages)
//        );
//    }
}