package com.example.lettering.controller;

import com.example.lettering.controller.request.sender.CreateLetterRequest;
import com.example.lettering.controller.request.sender.CreatePostcardRequest;
import com.example.lettering.controller.response.dear.*;
import com.example.lettering.controller.response.keyring.KeyringFilterListResponse;
import com.example.lettering.controller.response.keyring.KeyringFilterResponse;
import com.example.lettering.controller.response.sender.LetterBySenderDetailResponse;
import com.example.lettering.controller.response.sender.PostcardBySenderDetailResponse;
import com.example.lettering.controller.response.sender.SenderMessageSummaryListResponse;
import com.example.lettering.domain.keyring.service.KeyringService;
import com.example.lettering.domain.keyring.service.SessionService;
import com.example.lettering.domain.keyring.service.TokenService;
import com.example.lettering.domain.message.service.LetterService;
import com.example.lettering.domain.message.service.MessageService;
import com.example.lettering.domain.message.service.PostcardService;
import com.example.lettering.exception.ExceptionCode;
import com.example.lettering.exception.type.BusinessException;
import com.example.lettering.exception.type.ValidationException;
import com.example.lettering.util.dto.BooleanResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
@Tag(name = "Messasge", description = "메시지 관련 API")
public class MessageController {

    private final PostcardService postcardService;
    private final MessageService messageService;
    private final LetterService letterService;
    private final KeyringService keyringService;
    private final TokenService tokenService;
    private final SessionService sessionService;

    @Operation(summary = "고화질 이미지 API", description = "해당 메시지(우편 또는 엽서)의 고화질 이미지를 얻습니다.")
    @GetMapping("/highimage")
    public ResponseEntity<Map<String, String>> getHighQualityImage(   @RequestParam("messageId") Long messageId,
                                                                      @RequestParam(value = "index", defaultValue = "0") int index, HttpSession session)  {

        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            throw new ValidationException(ExceptionCode.SESSION_USER_NOT_FOUND);
        }

        String imageUrl = messageService.getHighQualityImageUrl(messageId, index);
        return ResponseEntity.ok(Map.of("imageHighUrl", imageUrl));
    }

    @Operation(summary = "엽서 작성 API", description = "엽서를 작성하여 등록합니다.")
    @PostMapping(path = "/postcards",consumes = "multipart/form-data")
    public ResponseEntity<Map<String, Object>> createPostcard(
            @RequestPart("postcard") CreatePostcardRequest createPostcardRequest,
            @RequestPart("image") MultipartFile imageFile, HttpSession session) throws IOException {

        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            throw new ValidationException(ExceptionCode.SESSION_USER_NOT_FOUND);
        }
        Long postcardId = postcardService.createPostcard(createPostcardRequest, imageFile, userId);

        Map<String, Object> result = new HashMap<>();
        result.put("id", postcardId);
        result.put("success", true);
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "편지 API", description = "편지를 작성하여 등록합니다.")
    @PostMapping(path = "/letters",consumes = "multipart/form-data")
    public ResponseEntity<Map<String, Object>> createLetter(
            @RequestPart("letter") CreateLetterRequest createLetterRequest,
            @RequestPart("images") List<MultipartFile> imageFiles, HttpSession session) throws IOException {

        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            throw new ValidationException(ExceptionCode.SESSION_USER_NOT_FOUND);
        }
        Long letterId = letterService.createLetter(createLetterRequest, imageFiles, userId);

        Map<String, Object> result = new HashMap<>();
        result.put("id", letterId);
        result.put("success", true);
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "보낸 사람 기준 메시지 목록 조회", description = "현재 사용자가 작성한 모든 메시지를 conditionTime 내림차순 정렬 후 제공합니다.")
    @GetMapping("/sender")
    public ResponseEntity<SenderMessageSummaryListResponse> getMessagesBySender(
            @RequestParam(name = "page", defaultValue = "0") int page, HttpSession session) {

        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            throw new ValidationException(ExceptionCode.SESSION_USER_NOT_FOUND);
        }
        return ResponseEntity.ok(SenderMessageSummaryListResponse.of(messageService.getMessagesBySender(userId, page)));
    }

    @Operation(summary = "보낸 사람 기준 엽서 상세 조회", description = "path variable로 전달된 messageId에 해당하는 엽서 상세 정보를 반환합니다. (favorite 제외)")
    @GetMapping("postcards/sender/{messageId}")
    public ResponseEntity<PostcardBySenderDetailResponse> getPostcardBySenderDetail(
            @PathVariable("messageId") Long messageId,
            HttpSession session) {

        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            throw new ValidationException(ExceptionCode.SESSION_USER_NOT_FOUND);
        }
        PostcardBySenderDetailResponse postcardDetailResponse = postcardService.getPostcardDetail(messageId);
        return ResponseEntity.ok(postcardDetailResponse);
    }

    @Operation(summary = "보낸 사람 기준 편지 상세 조회", description = "path variable로 전달된 messageId에 해당하는 편지 상세 정보를 반환합니다.")
    @GetMapping("letters/sender/{messageId}")
    public ResponseEntity<LetterBySenderDetailResponse> getLetterBySenderDetail(
            @PathVariable("messageId") Long messageId,
            HttpSession session) {

        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            throw new ValidationException(ExceptionCode.SESSION_USER_NOT_FOUND);
        }
        LetterBySenderDetailResponse letterBySenderDetailResponse = letterService.getLetterBySenderDetail(messageId);
        return ResponseEntity.ok(letterBySenderDetailResponse);
    }

    @Operation(summary = "받는 사람 기준 메시지 목록 조회", description = "안읽은순, 즐겨찾기순, 최신순으로 정렬합니다.")
    @GetMapping("dear/{keyringId}")
    public ResponseEntity<DearMessageSummaryListResponse> getMessagesToDear(
            @PathVariable("keyringId") Long keyringId,
            @RequestParam(name = "page", defaultValue = "0") int page) {

        //추후 태그 가져오는 방식 고민
        if (keyringId == null) {
            throw new BusinessException(ExceptionCode.KEYRING_NOT_FOUND);
        }
        return ResponseEntity.ok(DearMessageSummaryListResponse.of(messageService.getMessagesToDear(keyringId, page)));
    }

    @Operation(summary = "받은 사람 기준 엽서 상세 조회", description = "path variable로 전달된 messageId에 해당하는 엽서 상세 정보를 반환합니다.")
    @GetMapping("postcards/dear/{messageId}")
    public ResponseEntity<PostcardToDearDetailResponse> getPostcardToDearDetail(
            @PathVariable("messageId") Long messageId) {
        //키링 관련 session 검증 필요

        PostcardToDearDetailResponse postcardToDearDetailResponse = postcardService.getPostcardToDearDetail(messageId);
        return ResponseEntity.ok(postcardToDearDetailResponse);
    }

    @Operation(summary = "받은 사람 기준 편지 상세 조회", description = "path variable로 전달된 messageId에 해당하는 편지 상세 정보를 반환합니다.")
    @GetMapping("letters/dear/{messageId}")
    public ResponseEntity<LetterToDearDetailResponse> getLetterToDearDetail(
            @PathVariable("messageId") Long messageId) {
        //키링 관련 session 검증 필요

        LetterToDearDetailResponse letterToDearDetailResponse = letterService.getLetterToDearDetail(messageId);
        return ResponseEntity.ok(letterToDearDetailResponse);
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
    @PatchMapping("reply/{messageId}")
    public ResponseEntity<BooleanResponse> createReply(
            @PathVariable("messageId") Long messageId,
            @RequestBody CreateReplyRequest createReplyRequest) {
        //키링 관련 session 검증 필요

        messageService.createReply(messageId, createReplyRequest.getReplyText());
        return ResponseEntity.ok(new BooleanResponse(true));
    }

    @Operation(summary = "받은 메시지 즐겨찾기 토글",
            description = "메시지의 즐겨찾기 상태를 토글합니다. 현재 상태가 true이면 false로, false이면 true로 변경합니다. (로그인 없이 keyringId로 검증)")
    @PatchMapping("favorite/{messageId}")
    public ResponseEntity<BooleanResponse> toggleFavorite(
            @PathVariable("messageId") Long messageId) {
        //키링 관련 session 검증 필요

        messageService.toggleFavorite(messageId);
        return ResponseEntity.ok(new BooleanResponse(true));
    }


    @GetMapping("/unread")
    public ResponseEntity<UnreadMessageResponse> getUnreadMessagebackoffice(HttpSession session)  {
//        Long keyringId = (Long) session.getAttribute("keyringId");
        Long keyringId = 2L;
        if (keyringId == null) {
            throw new BusinessException(ExceptionCode.KEYRING_NOT_FOUND);
        }

        UnreadMessageResponse unreadMessageResponse = messageService.getLatestUnreadMessage(keyringId);
        return ResponseEntity.ok(unreadMessageResponse);
    }

    @Operation(summary = "보낸 사람 기준 키링 필터",
            description = "세션의 userId(즉, ownerId)와 일치하는 keyring의 id와 nfcName을 반환합니다.")
    @GetMapping("/filter")
    public ResponseEntity<KeyringFilterListResponse> filterKeyringsByOwner(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            throw new ValidationException(ExceptionCode.SESSION_USER_NOT_FOUND);
        }

        return ResponseEntity.ok(KeyringFilterListResponse.of(keyringService.getKeyringsByOwner(userId)));
    }

    /**
     * 🔐 메시지 수신자 기준 메시지 조회 API
     *
     * NFC 태깅 후 리디렉션된 페이지에서 token + mac 검증을 수행하고,
     * 검증 통과 시 sessionToken을 발급하여 이후 인증 기반으로 사용된다.
     *
     * @param keyringId NFC 키링 고유 ID
     * @param token 발급된 일회용 토큰
     * @param mac token에 대한 HMAC 서명
     * @param page 조회할 페이지 (기본값 0)
     * @param request 클라이언트 요청 (IP / UA 확인용)
     * @return 메시지 목록 + X-Session-Token 헤더 포함 응답
     */
//    @GetMapping("dear/{keyringId}")
//    public ResponseEntity<DearMessageSummaryListResponse> getDearMessages(
//            @PathVariable("keyringId") Long keyringId,
//            @RequestParam("token") String token,
//            @RequestParam("mac") String mac,
//            @RequestParam(name = "page", defaultValue = "0") int page,
//            HttpServletRequest request) {
//
//        if (keyringId == null) {
//            throw new BusinessException(ExceptionCode.VALIDATION_ERROR);
//        }
//
//        String ip = request.getRemoteAddr();
//        String ua = request.getHeader("User-Agent");
//
//        // 🔐 token/mac 검증
//        if (!tokenService.isValid(token, mac, keyringId, ip, ua)) {
//            throw new BusinessException(ExceptionCode.UNAUTHORIZED_ACCESS); // 403
//        }
//
//        // ✅ 세션토큰 발급
//        String sessionToken = sessionService.issueSession(keyringId, ip, ua);
//
//        // 📩 메시지 조회
//        DearMessageSummaryListResponse response = DearMessageSummaryListResponse.of(
//                messageService.getMessagesToDear(keyringId, page) // 안읽은 → 즐겨찾기 → 최신순 정렬 적용
//        );
//
//        // 📨 sessionToken 헤더에 포함해서 응답
//        return ResponseEntity.ok()
//                .header("X-Session-Token", sessionToken)
//                .body(response);
//    }

    /**
     * 📄 엽서 상세 조회 API (받는 사람 전용)
     *
     * 발급받은 sessionToken을 Authorization 헤더로 전달하여 인증을 수행하며,
     * token이 유효하지 않거나 만료되었으면 403을 반환한다.
     *
     * @param auth Authorization 헤더에 담긴 sessionToken ("Bearer {token}")
     * @param keyringId 현재 접속한 키링의 keyringId
     * @param request 클라이언트 IP / User-Agent 확인
     * @return 엽서 상세 데이터
     */
//    @GetMapping("postcards/detail")
//    public ResponseEntity<Map<String, Object>> getDetail(
//            @RequestHeader("Authorization") String auth,
//            @RequestParam("keyringId") Long keyringId,
//            HttpServletRequest request) {
//
//        String token = auth.replace("Bearer ", "");
//        String ip = request.getRemoteAddr();
//        String ua = request.getHeader("User-Agent");
//
//        if (!sessionService.isValid(token, keyringId, ip, ua)) {
//            throw new BusinessException(ExceptionCode.UNAUTHORIZED_ACCESS);
//        }
//
//        // 💌 실제 내용 반환
//        Map<String, Object> result = new HashMap<>();
//        result.put("title", "🌸 너에게 보내는 편지");
//        result.put("message", "오늘도 좋은 하루 보내길 바래!");
//        result.put("keyringId", keyringId);
//        result.put("timestamp", System.currentTimeMillis());
//
//        return ResponseEntity.ok(result);
//    }
}