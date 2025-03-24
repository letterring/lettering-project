package com.example.lettering.domain.keyring.repository;

import com.example.lettering.domain.keyring.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long>, OrderRepositoryCustom {
}
