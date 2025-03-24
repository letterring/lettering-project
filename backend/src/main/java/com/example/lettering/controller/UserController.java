package com.example.lettering.controller;

import com.example.lettering.controller.request.LoginRequestDto;
import com.example.lettering.controller.response.LoginResponseDto;
import com.example.lettering.controller.request.SignUpRequestDto;
import com.example.lettering.domain.user.service.AuthServiceImpl;
import com.example.lettering.domain.user.service.UserServiceImpl;
import com.example.lettering.domain.user.entity.User;
import com.example.lettering.domain.user.repository.UserRepository;
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
    private final UserServiceImpl userService;
    private final AuthServiceImpl authService;
    private final UserRepository userRepository;

    @Operation(summary = "회원가입 기능", description = "회원가입을 수행합니다.")
    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signupUser(@Valid @RequestBody SignUpRequestDto signUpRequestDto) {
        try {
            userService.addUser(signUpRequestDto);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Collections.singletonMap("message", "회원가입이 완료되었습니다."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    @Operation(summary = "로그인", description = "이메일을 통해 로그인합니다.")
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequestDto loginRequestDto, HttpSession session) {
        try {
            LoginResponseDto responseDto = authService.loginUser(loginRequestDto);

            session.setAttribute("userId", responseDto.getUserId());
            session.setAttribute("userNickname", responseDto.getUserNickname());

            return ResponseEntity.ok(responseDto);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("error", "등록되지 않은 이메일입니다."));
        } catch (AuthenticationFailedException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("error", "로그인 인증에 실패했습니다."));
        }
    }

    @Operation(summary = "현재 로그인 회원정보 조회 기능", description = "세션을 활용하여 로그인한 회원 정보를 조회합니다.")
    @GetMapping("/me")
    public ResponseEntity<?> getUserProfile(HttpSession session) {
        Long userId = (Long) session.getAttribute("userId");
        String userNickname = (String) session.getAttribute("userNickname");

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("error", "로그인이 필요합니다."));
        }

        return ResponseEntity.ok(new LoginResponseDto(userId, userNickname));
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
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("로그인이 필요합니다.");
        }

        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("사용자 정보를 찾을 수 없습니다.");
        }

        User user = userOptional.get();

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

}
