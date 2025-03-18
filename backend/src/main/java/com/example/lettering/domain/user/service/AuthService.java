package com.example.lettering.domain.user.service;

import com.example.lettering.domain.user.dto.LoginRequestDto;
import com.example.lettering.domain.user.dto.LoginResponseDto;
import com.example.lettering.domain.user.entity.User;
import com.example.lettering.domain.user.enums.Provider;
import com.example.lettering.domain.user.repository.SaltRepository;
import com.example.lettering.domain.user.repository.UserRepository;
import com.example.lettering.util.OpenCrypt;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import jakarta.mail.AuthenticationFailedException;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final SaltRepository saltRepository;

    public LoginResponseDto loginUser(LoginRequestDto loginRequestDto) throws AuthenticationFailedException {
        Provider provider = (loginRequestDto.getProvider() != null) ? loginRequestDto.getProvider() : Provider.LOCAL;

        // ✅ 이메일과 provider로 사용자 찾기
        User loginUser = userRepository.findByEmailAndProvider(loginRequestDto.getEmail(), provider)
                .orElseThrow(() -> new NoSuchElementException("EMAIL_NOT_FOUND"));

        // ✅ 소셜 로그인(KAKAO 등)은 비밀번호 검증 필요 없음
        if (provider == Provider.LOCAL) {
            // ✅ 해당 사용자의 Salt 가져오기
            String salt = saltRepository.findById(loginUser.getId())
                    .orElseThrow(() -> new NoSuchElementException("SALT_NOT_FOUND"))
                    .getSalt();

            // ✅ 입력한 비밀번호를 암호화 (SHA-256 + Salt 적용)
            String encryptedPassword = OpenCrypt.byteArrayToHex(
                    OpenCrypt.getSHA256(loginRequestDto.getPassword(), salt)
            );

            // 🚨 비밀번호가 저장된 비밀번호와 일치하는지 확인
            if (!loginUser.getPassword().equals(encryptedPassword)) {
                throw new AuthenticationFailedException("AUTH_FAILED: 비밀번호가 일치하지 않습니다.");
            }
        }

        // ✅ 로그인 성공 시 유저 정보 반환
        return new LoginResponseDto(loginUser.getId(), loginUser.getUserNickname());
    }

    public LoginResponseDto createResponseDto(User user) {
        return new LoginResponseDto(user.getId(), user.getUserNickname());
    }
}
