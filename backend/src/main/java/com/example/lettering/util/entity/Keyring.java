package com.example.lettering.util.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "keyring")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Keyring {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 구매 여부 (구매하지 않았으면 owner가 null인 것으로 체크 가능)
    @Column(name = "is_purchase", nullable = false)
    private Boolean isPurchase;

    // 보낸 사람(구매자)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    // 받는 사람의 이름 (NFCName) - 편지에서 수신자 정보를 관리하지 않으므로 이곳에서 관리
    @Column(name = "nfc_name", nullable = false)
    private String nfcName;

    // 키링 디자인 (KeyringDesign 엔티티 참조)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "design_id", nullable = false)
    private KeyringDesign design;

    // 연결된 NFC 태그 값
    @Column(name = "tag_code", nullable = false, unique = true)
    private String tagCode;
}