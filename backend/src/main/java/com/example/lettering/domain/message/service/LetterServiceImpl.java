package com.example.lettering.domain.message.service;

import com.example.lettering.domain.message.repository.LetterRepository;
import com.example.lettering.domain.user.repository.UserRepository;
import com.example.lettering.util.S3ImageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LetterServiceImpl implements LetterService {

    private final LetterRepository letterRepository;
    private final UserRepository userRepository; // sender 조회시 사용
    private final S3ImageUtil s3ImageUtil;

//    @Override
//    public LetterResponse createLetter(CreateLetterRequest request, List<MultipartFile> imageFiles) throws IOException {
//        // sender 조회, UserService나 Repository에 메서드 추후 있다고 가정
//
//        // Letter 엔티티 생성 (of() 정적 팩토리 메서드 활용), 고민인게 Setter없다보니 별도로 update 메서드 두거나 아니면 음 엔티티 저장 로직 이전에 두거나.
//
//        // 이미지 S3에 업로드 필요
//
//        // 엔티티 저장 로직 필요
//
//        return LetterResponse.from(savedLetter);
//    }
}
