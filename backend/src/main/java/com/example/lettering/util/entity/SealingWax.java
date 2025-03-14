package com.example.lettering.util.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "sealing_wax")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SealingWax {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 실링왁스 이름 (예: Classic, Modern 등)
    @Column(name = "sealing_wax_name", nullable = false)
    private String sealingWaxName;

    // 이미지 개수 (추후 유효성 검사용)
    @Column(name = "image_count", nullable = false)
    private Integer imageCount;

    // 추가: 실링왁스 이미지 URL (S3 등에서 관리되는 이미지 주소)
    @Column(name = "image_url", nullable = false)
    private String imageUrl;
}