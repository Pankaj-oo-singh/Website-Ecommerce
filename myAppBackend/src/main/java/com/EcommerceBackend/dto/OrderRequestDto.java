package com.EcommerceBackend.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderRequestDto {

    private Long userId;
    private Date orderDate;
    private Long addressId;
    private List<OrderItemRequestDto> orderItemRequests;
    private Double totalAmount;
    private Double discount;
    private String paymentMethod;
    private Date expectedDeliveryDate;
}
