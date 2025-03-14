package com.example.lettering.util.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 생성 시각
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    // 로그인/식별 정보
    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "user_nickname", nullable = false)
    private String userNickname;

    private String provider;

    // 추가: 실명 (키링 구매 시 입력)
    @Column(name = "real_name")
    private String realName;

    // 추가: 유저 폰트 (enum) - 초기 회원가입 시 null 허용
    @Enumerated(EnumType.STRING)
    @Column(name = "font")
    private Font font;

    // 추가: 도로명 주소 및 상세 주소 (null 허용)
    @Column(name = "road_address")
    private String roadAddress;

    @Column(name = "detail_address")
    private String detailAddress;

    // 추가: 핸드폰 번호 (null 허용)
    @Column(name = "phone_number")
    private String phoneNumber;

    // == 연관관계 == //

    // (1) 보낸 편지
    @OneToMany(mappedBy = "sender", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Letter> letters;

    // (2) 구매(또는 발송)한 키링
    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Keyring> keyrings;

    // (3) 작성한 엽서
    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Postcard> postcards;

    // 최소 정보만 받는 생성자 (회원가입 시)
    public User(String userNickname, String email, String password) {
        this.userNickname = userNickname;
        this.email = email;
        this.password = password;
        this.createdAt = LocalDateTime.now();
    }

    // 키링 구매 시 업데이트할 때 사용할 생성자(또는 별도 setter 활용)
    public User(String userNickname, String email, String password, String provider, Font font, String roadAddress, String detailAddress, String phoneNumber, String realName) {
        this.userNickname = userNickname;
        this.email = email;
        this.password = password;
        this.provider = provider;
        this.font = font;
        this.roadAddress = roadAddress;
        this.detailAddress = detailAddress;
        this.phoneNumber = phoneNumber;
        this.realName = realName;
        this.createdAt = LocalDateTime.now();
    }
}