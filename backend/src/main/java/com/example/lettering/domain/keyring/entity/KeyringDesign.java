package com.example.lettering.domain.keyring.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "keyring_design")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KeyringDesign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 디자인 이름 (예: "우편함", "심플", "레트로" 등)
    @Column(name = "design_name", nullable = false)
    private String designName;

    // 디자인 이미지 URL (S3 등에서 관리되는 이미지 주소)
    @Column(name = "image_url")
    private String imageUrl;

    // 가격 정보를 추가 (각 디자인에 고정된 가격)
    @Column(name = "price", nullable = false)
    private Long price;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
}