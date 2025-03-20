package com.example.lettering.domain.postcard.entity;

import com.example.lettering.domain.common.entity.AbstractMessage;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "postcard")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Postcard extends AbstractMessage {

    // 단일 콘텐츠
    @Column(nullable = false)
    private String content;

    // 단일 이미지 URL
    @Column(name = "image_url", nullable = false)
    private String imageUrl;
}