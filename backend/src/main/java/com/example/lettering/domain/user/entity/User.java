package com.example.lettering.domain.user.entity;

import com.example.lettering.domain.keyring.entity.Order;
import com.example.lettering.domain.user.enums.Provider;
import com.example.lettering.util.entity.Font;
import com.example.lettering.domain.keyring.entity.Keyring;
import com.example.lettering.util.entity.Letter;
import com.example.lettering.util.entity.Postcard;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users",
        uniqueConstraints = @UniqueConstraint(columnNames = {"email", "provider"}))
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED) // JPA 기본 생성자 보호
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private String email;

    @Column(nullable = true) // ✅ OAuth 로그인 시 비밀번호 null 가능
    private String password;

    @Column(name = "user_nickname", nullable = false)
    private String userNickname;

    @Enumerated(EnumType.STRING) // ✅ ENUM을 String 형태로 DB에 저장
    private Provider provider;

    @Column(name = "real_name")
    private String realName;

    @Enumerated(EnumType.STRING)
    @Column(name = "font")
    private Font font;

    @Column(name = "zipcode", nullable = false)
    private String zipcode;

    @Column(name = "road_address")
    private String roadAddress;

    @Column(name = "detail_address")
    private String detailAddress;

    @Column(name = "phone_number")
    private String phoneNumber;

    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Letter> letters;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Keyring> keyrings;

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Postcard> postcards;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Order> orders;

    // ✅ **OAuth 회원가입 (비밀번호 필요 없음)**
    public static User createOAuthUser(String email, String userNickname, Provider provider) {
        return User.builder()
                .email(email)
                .userNickname(userNickname)
                .provider(provider)
                .createdAt(LocalDateTime.now())
                .build();
    }

    // ✅ **비밀번호 업데이트 (setter 없이)**
    public void updatePassword(String encryptedPassword) {
        this.password = encryptedPassword;
    }

    // ✅ **닉네임 업데이트 (빌더 패턴 오류 해결)**
    public void updateNickname(String newNickname) {
        this.userNickname = (newNickname != null) ? newNickname : this.userNickname;
    }

    public void updateAddress(String realName, String phoneNumber, String zipcode, String roadAddress, String detailAddress) {
        this.realName = realName;
        this.phoneNumber = phoneNumber;
        this.zipcode = zipcode;
        this.roadAddress = roadAddress;
        this.detailAddress = detailAddress;
    }

    // ✅ **OAuth 로그인 시 기존 사용자 정보 업데이트 가능**
    public void updateOAuthInfo(String newNickname) {
        if (newNickname != null) {
            this.userNickname = newNickname;
        }
    }

    // provider가 null일 경우 기본값 설정
    public void updateProviderIfNull() {
        if (this.provider == null) {
            this.provider = Provider.LOCAL;
        }
    }

    @PrePersist // ✅ INSERT 전 자동 실행
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // ✅ 이메일, 닉네임, Provider를 받는 생성자 추가 (필수)
    public User(String email, String userNickname, Provider provider) {
        this.email = email;
        this.userNickname = userNickname;
        this.provider = provider;
        this.createdAt = LocalDateTime.now(); // 자동 생성
    }

}


