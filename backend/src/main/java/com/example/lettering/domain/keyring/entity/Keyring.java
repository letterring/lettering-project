package com.example.lettering.domain.keyring.entity;

import com.example.lettering.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "keyring")
@Getter
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
    @Column(name = "nfc_name")
    private String nfcName;

    @Builder.Default
    @Column(name = "is_favorite", nullable = false)
    private Boolean isFavorite = false;

    // 키링 디자인 (KeyringDesign 엔티티 참조)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "design_id")
    private KeyringDesign design;

    // 연결된 NFC 태그 값
    @Column(name = "tag_code", nullable = false, unique = true)
    private String tagCode;

    @Column(name = "custom_message")
    private String customMessage; // ✅ "나만의 메시지"

    public void purchase(User owner, KeyringDesign design) {
        this.isPurchase = true;
        this.owner = owner;
        this.design = design;
    }

    public void toggleFavorite() {
        this.isFavorite = !this.isFavorite;
    }

    public static Keyring createNew(String tagCode) {
        return new Keyring(
                null,          // id
                false,         // isPurchase
                null,          // owner
                "우체통 이름",   // nfcName
                false,         // isFavorite
                null,          // design
                tagCode,        // tagCode
                null
        );
    }

    public void setCustomMessage(String customMessage) {
        this.customMessage = customMessage;
    }

    public void updateNfcName(String newName) {
        this.nfcName = newName;
    }

    public void removeOwner() {
        this.owner = null;
        this.isFavorite = false;
    }

}