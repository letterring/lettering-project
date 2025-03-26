package com.example.lettering.controller;

import com.example.lettering.controller.request.LoginRequest;
import com.example.lettering.controller.request.UpdateFontRequest;
import com.example.lettering.controller.request.UpdateNicknameRequest;
import com.example.lettering.controller.response.LoginResponse;
import com.example.lettering.controller.request.SignUpRequest;
import com.example.lettering.controller.response.UserAddressResponse;
import com.example.lettering.controller.response.UserMypageResponse;
import com.example.lettering.domain.user.service.AuthService;
import com.example.lettering.domain.user.service.AuthServiceImpl;
import com.example.lettering.domain.user.service.UserService;
import com.example.lettering.domain.user.service.UserServiceImpl;
import com.example.lettering.domain.user.entity.User;
import com.example.lettering.domain.user.repository.UserRepository;
import com.example.lettering.exception.ExceptionCode;
import com.example.lettering.exception.type.ValidationException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.AuthenticationFailedException;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "User API", description = "유저 관련 API")
public class UserController {
    private final UserService userService;
    private final AuthService authService;

    @Operation(summary = "회원가입 기능", description = "회원가입을 수행합니다.")
    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signupUser(@Valid @RequestBody SignUpRequest signUpRequestDto) {
        userService.addUser(signUpRequestDto); // 예외는 내부에서 처리됨
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Collections.singletonMap("message", "회원가입이 완료되었습니다."));
    }

    @Operation(summary = "로그인", description = "이메일을 통해 로그인합니다.")
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequestDto, HttpSession session) {
        LoginResponse responseDto = authService.loginUser(loginRequestDto);

        session.setAttribute("userId", responseDto.getUserId());
        session.setAttribute("userNickname", responseDto.getUserNickname());

        return ResponseEntity.ok(responseDto);
    }

    @Operation(summary = "현재 로그인 회원정보 조회 기능", description = "세션을 활용하여 로그인한 회원 정보를 조회합니다.")
    @GetMapping("/me")
    public ResponseEntity<?> getUserProfile(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        String userNickname = (String) session.getAttribute("userNickname");

        if (userId == null) {
            throw new ValidationException(ExceptionCode.SESSION_USER_NOT_FOUND);
        }

        User user = userService.getUserById(userId);

        return ResponseEntity.ok(new LoginResponse(user.getId(), user.getUserNickname()));
    }

    @Operation(summary = "로그아웃 기능", description = "현재 로그인된 유저의 세션을 삭제하고 로그아웃합니다.")
    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logoutUser(HttpSession session) {
        if (session != null) {
            session.invalidate(); // ✅ 세션 무효화
        }

        SecurityContextHolder.clearContext(); // ✅ Spring Security 인증 정보 삭제

        return ResponseEntity.ok(Collections.singletonMap("message", "로그아웃 성공"));
    }

    @Operation(summary = "회원 주소 조회", description = "로그인된 사용자의 주소 정보를 불러옵니다.")
    @GetMapping("/address")
    public ResponseEntity<?> getUserAddress(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");

        if (userId == null) {
            throw new ValidationException(ExceptionCode.SESSION_USER_NOT_FOUND);
        }

        User user = userService.getUserById(userId);

        // DTO 생성해서 반환
        UserAddressResponse dto = new UserAddressResponse(
                user.getRealName(),
                user.getPhoneNumber(),
                user.getEmail(),
                user.getZipcode(),
                user.getRoadAddress(),
                user.getDetailAddress()
        );

        return ResponseEntity.ok(dto);
    }

    @Operation(summary = "마이페이지 조회", description = "사용자 정보 및 키링 정보 조회")
    @GetMapping("/mypage")
    public ResponseEntity<UserMypageResponse> getMypage(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");

        if (userId == null) {
            throw new ValidationException(ExceptionCode.SESSION_USER_NOT_FOUND);
        }

        return ResponseEntity.ok(userService.getMypageInfo(userId));
    }

    @PatchMapping("/nickname")
    @Operation(summary = "닉네임 수정", description = "로그인한 사용자의 닉네임을 수정합니다.")
    public ResponseEntity<?> updateNickname(
            @RequestBody @Valid UpdateNicknameRequest request,
            HttpSession session
    ) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            throw new ValidationException(ExceptionCode.SESSION_USER_NOT_FOUND);
        }

        userService.updateNickname(userId, request.getNewNickname());
        return ResponseEntity.ok(Map.of("message", "닉네임이 성공적으로 변경되었습니다."));
    }

    @PatchMapping("/font")
    @Operation(summary = "폰트 수정", description = "로그인한 사용자의 폰트를 수정합니다.")
    public ResponseEntity<?> updateFont(
            @RequestBody @Valid UpdateFontRequest request,
            HttpSession session
    ) {
        Long userId = (Long) session.getAttribute("userId");
        if (userId == null) {
            throw new ValidationException(ExceptionCode.SESSION_USER_NOT_FOUND);
        }

        userService.updateFont(userId, request.getFont());

        return ResponseEntity.ok(Map.of("message", "폰트가 성공적으로 변경되었습니다."));
    }

    @Operation(summary = "현재 로그인 유저 폰트 조회", description = "세션을 통해 로그인된 사용자의 폰트를 조회합니다.")
    @GetMapping("/font")
    public ResponseEntity<Map<String, String>> getUserFont(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");

        if (userId == null) {
            throw new ValidationException(ExceptionCode.SESSION_USER_NOT_FOUND);
        }

        User user = userService.getUserById(userId);

        String font = (user.getFont() != null) ? user.getFont().name() : null;

        return ResponseEntity.ok(Map.of("font", font));
    }

}
