package com.example.lettering.domain.user.service;

import com.example.lettering.controller.response.KeyringInfoResponse;
import com.example.lettering.controller.response.UserMypageResponse;
import com.example.lettering.domain.common.repository.AbstractMessageRepository;
import com.example.lettering.domain.keyring.entity.Keyring;
import com.example.lettering.domain.keyring.repository.KeyringRepository;
import com.example.lettering.domain.letter.enums.ConditionType;
import com.example.lettering.domain.user.dto.PasswordEncryptionResult;
import com.example.lettering.controller.request.SignUpRequest;
import com.example.lettering.domain.user.entity.Salt;
import com.example.lettering.domain.user.entity.User;
import com.example.lettering.domain.user.enums.Font;
import com.example.lettering.domain.user.enums.Provider;
import com.example.lettering.domain.user.repository.SaltRepository;
import com.example.lettering.domain.user.repository.UserRepository;
import com.example.lettering.exception.ExceptionCode;
import com.example.lettering.exception.type.BusinessException;
import com.example.lettering.exception.type.DbException;
import com.example.lettering.util.OpenCrypt;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final SaltRepository saltRepository;
    private final KeyringRepository keyringRepository;
    private final AbstractMessageRepository abstractMessageRepository;

    @Override
    public void addUser(SignUpRequest signUpRequestDto) {
        validateDuplicateUserInfo(signUpRequestDto);

        // ✅ provider가 null이면 기본값 LOCAL 설정
        Provider provider = (signUpRequestDto.getProvider() != null) ? signUpRequestDto.getProvider() : Provider.LOCAL;

        // ✅ 같은 이메일을 가진 모든 계정 조회
        List<User> usersWithEmail = userRepository.findAllByEmail(signUpRequestDto.getEmail());

        // ✅ 같은 이메일이 존재하는 경우, provider를 확인하여 중복 처리
        for (User user : usersWithEmail) {
            if (user.getProvider() == Provider.LOCAL && provider == Provider.LOCAL) {
                throw new BusinessException(ExceptionCode.EMAIL_DUPLICATED);
            }
        }

        // ✅ User 객체 생성
        User user = User.builder()
                .userNickname(signUpRequestDto.getUserNickname())
                .email(signUpRequestDto.getEmail())
                .provider(provider) // ✅ ENUM 저장
                .createdAt(LocalDateTime.now())
                .build();

        // ✅ LOCAL 계정이라면 비밀번호 암호화 (Salt 적용)
        if (provider == Provider.LOCAL) {
            PasswordEncryptionResult encryptionResult = OpenCrypt.encryptPw(signUpRequestDto.getPassword());
            user.updatePassword(encryptionResult.getHashedPassword());

            // ✅ Salt 정보 저장
            userRepository.save(user); // 먼저 User를 저장해야 ID를 가져올 수 있음
            saltRepository.save(new Salt(user.getId(), encryptionResult.getSalt()));
        } else {
            // ✅ 소셜 로그인(KAKAO 등)은 비밀번호 암호화 없이 저장
            userRepository.save(user);
        }
    }

    @Override
    public void validateDuplicateUserInfo(SignUpRequest signUpRequestDto) {
        if (userRepository.existsByUserNickname(signUpRequestDto.getUserNickname())) {
            throw new BusinessException(ExceptionCode.USER_NICKNAME_DUPLICATED);
        }

        // ✅ 이메일 중복 검사 (이미 `LOCAL` 계정이면 가입 불가)
        if (isLocalUser(signUpRequestDto.getEmail())) {
            throw new BusinessException(ExceptionCode.EMAIL_DUPLICATED);
        }
    }

    @Override
    // ✅ 이메일이 이미 존재하고, `LOCAL` 계정인지 확인하는 메서드
    public boolean isLocalUser(String email) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        return existingUser.isPresent() && existingUser.get().getPassword() != null; // ✅ LOCAL 계정이면 password 존재
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new DbException(ExceptionCode.USER_NOT_FOUND));
    }

    @Override
    public UserMypageResponse getMypageInfo(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new DbException(ExceptionCode.USER_NOT_FOUND));


        List<Keyring> keyrings = keyringRepository.findAllByOwnerId(userId);


        List<KeyringInfoResponse> keyringResponses = keyrings.stream().map(keyring -> {
            Long keyringId = keyring.getId();

            return new KeyringInfoResponse(
                    keyringId,
                    keyring.getNfcName(),
                    keyring.getIsFavorite(),
                    abstractMessageRepository.findLastSentTimeByKeyring(keyringId),
                    abstractMessageRepository.countByKeyring(keyringId),
                    abstractMessageRepository.countByKeyringAndConditionType(keyringId, ConditionType.RESERVATION),
                    abstractMessageRepository.countByKeyringAndConditionType(keyringId, ConditionType.TIMECAPSULE),
                    abstractMessageRepository.countByKeyringAndConditionType(keyringId, ConditionType.SECRETTYPE)
            );
        }).toList();

        return new UserMypageResponse(
                user.getUserNickname(),
                user.getFont() != null ? user.getFont().name() : null,
                keyringResponses
        );
    }

    @Override
    public void updateNickname(Long userId, String newNickname) {
        User user = getUserById(userId);
        user.updateNickname(newNickname);

    }

    @Override
    public void updateFont(Long userId, Font newFont) {
        User user = getUserById(userId);
        user.updateFont(newFont); // ✅ setter 대신 명시적 도메인 메서드 사용
    }

}
