package com.example.lettering.domain.user.service;

import com.example.lettering.controller.request.LoginRequestDto;
import com.example.lettering.controller.response.LoginResponseDto;
import com.example.lettering.domain.user.entity.User;
import com.example.lettering.domain.user.enums.Provider;
import com.example.lettering.domain.user.repository.SaltRepository;
import com.example.lettering.domain.user.repository.UserRepository;
import com.example.lettering.exception.ExceptionCode;
import com.example.lettering.exception.type.BusinessException;
import com.example.lettering.util.OpenCrypt;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import jakarta.mail.AuthenticationFailedException;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{
    private final UserRepository userRepository;
    private final SaltRepository saltRepository;

    @Override
    public LoginResponseDto loginUser(LoginRequestDto loginRequestDto) throws AuthenticationFailedException {
        Provider provider = (loginRequestDto.getProvider() != null) ? loginRequestDto.getProvider() : Provider.LOCAL;

        // ✅ 이메일과 provider로 사용자 찾기
        User loginUser = userRepository.findByEmailAndProvider(loginRequestDto.getEmail(), provider)
                .orElseThrow(() -> new BusinessException(ExceptionCode.EMAIL_NOT_FOUND));

        // ✅ 소셜 로그인(KAKAO 등)은 비밀번호 검증 필요 없음
        if (provider == Provider.LOCAL) {
            // ✅ 해당 사용자의 Salt 가져오기
            String salt = saltRepository.findById(loginUser.getId())
                    .orElseThrow(() -> new BusinessException(ExceptionCode.SALT_NOT_FOUND))
                    .getSalt();

            // ✅ 입력한 비밀번호를 암호화 (SHA-256 + Salt 적용)
            String encryptedPassword = OpenCrypt.byteArrayToHex(
                    OpenCrypt.getSHA256(loginRequestDto.getPassword(), salt)
            );

            // 🚨 비밀번호가 저장된 비밀번호와 일치하는지 확인
            if (!loginUser.getPassword().equals(encryptedPassword)) {
                throw new BusinessException(ExceptionCode.INVALID_PASSWORD);
            }
        }

        // ✅ 로그인 성공 시 유저 정보 반환
        return new LoginResponseDto(loginUser.getId(), loginUser.getUserNickname());
    }

    @Override
    public LoginResponseDto createResponseDto(User user) {
        return new LoginResponseDto(user.getId(), user.getUserNickname());
    }
}
