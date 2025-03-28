package com.example.lettering.domain.keyring.entity;

import com.example.lettering.domain.keyring.enums.OrderStatus;
import com.example.lettering.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_number", nullable = false, unique = true)
    private Long orderNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "real_name", nullable = false)
    private String realName;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "zipcode", nullable = false)
    private String zipcode;

    @Column(name = "road_address", nullable = false)
    private String roadAddress;

    @Column(name = "detail_address")
    private String detailAddress;

    @Column(name = "order_date", nullable = false)
    private LocalDateTime orderDate;

    @Column(name = "total_price", nullable = false)
    private Long totalPrice;

    @Column(name = "tid")
    private String tid;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private OrderStatus status = OrderStatus.WAITING;

    @PrePersist
    protected void onCreate() {
        this.orderDate = LocalDateTime.now();
    }

    public void setTid(String tid) {
        this.tid = tid;
    }

    public void markAsPaid() {
        this.status = OrderStatus.PAID;
    }

    public static Order create(User user, Long orderNumber, String realName, String phoneNumber,
                               String email, String zipcode, String roadAddress,
                               String detailAddress, Long totalPrice) {
        return Order.builder()
                .orderNumber(orderNumber)
                .user(user)
                .realName(realName)
                .phoneNumber(phoneNumber)
                .email(email)
                .zipcode(zipcode)
                .roadAddress(roadAddress)
                .detailAddress(detailAddress)
                .totalPrice(totalPrice)
                .status(OrderStatus.WAITING) // ✅ 여기 추가!
                .build();
    }

}