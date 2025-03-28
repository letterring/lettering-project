package com.example.lettering.domain.keyring.repository;

import com.example.lettering.domain.keyring.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long>, OrderRepositoryCustom {
    @Query("SELECT MAX(o.orderNumber) FROM Order o")
    Long getMaxOrderNumber();
}
