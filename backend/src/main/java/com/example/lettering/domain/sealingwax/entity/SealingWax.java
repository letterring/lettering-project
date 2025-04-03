package com.example.lettering.domain.sealingwax.entity;

import com.example.lettering.controller.request.sender.CreateSealingWaxRequest;
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

    @Column(name = "sealing_wax_name", nullable = false)
    private String sealingWaxName;

    @Column(name = "design_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private DesignType designType;

    // 텍스트 단락 개수
    @Column(name = "content_count", nullable = false)
    private Integer contentCount;

    // 이미지 개수
    @Column(name = "image_count", nullable = false)
    private Integer imageCount;

    // 추가: 실링왁스 이미지 URL (S3 등에서 관리되는 이미지 주소)
    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    public static SealingWax fromDto(CreateSealingWaxRequest createSealingWaxRequest, String imageUrl) {
        return SealingWax.builder()
                .sealingWaxName(createSealingWaxRequest.getSealingWaxName())
                .contentCount(createSealingWaxRequest.getContentCount())
                .imageCount(createSealingWaxRequest.getImageCount())
                .imageUrl(imageUrl)
                .designType(createSealingWaxRequest.getDesignType())
                .build();
    }
}