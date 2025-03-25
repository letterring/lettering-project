package com.example.lettering.domain.sealingwax.entity;

import com.example.lettering.controller.request.CreateSealingWaxRequest;
import com.example.lettering.domain.sealingwax.enums.DesignType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "sealing_wax")
@Getter
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

    @Column(name = "design_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private DesignType designType;

    // 이미지 개수 (추후 유효성 검사용)
    @Column(name = "image_count", nullable = false)
    private Integer imageCount;

    // 추가: 실링왁스 이미지 URL (S3 등에서 관리되는 이미지 주소)
    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    public static SealingWax fromDto(CreateSealingWaxRequest createSealingWaxRequest, String imageUrl) {
        return SealingWax.builder()
                .sealingWaxName(createSealingWaxRequest.getSealingWaxName())
                .imageCount(createSealingWaxRequest.getImageCount())
                .imageUrl(imageUrl)
                .designType(createSealingWaxRequest.getDesignType())
                .build();
    }
}