package com.EcommerceBackend.repositories;

import com.EcommerceBackend.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {
    List<Order> findByUserId(Long userId);
    Optional<Order> findByStripePaymentIntentId(String stripePaymentIntentId);

}
