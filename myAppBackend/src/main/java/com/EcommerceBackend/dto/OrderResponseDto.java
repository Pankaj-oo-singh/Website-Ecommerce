package com.EcommerceBackend.dto;

import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponseDto {
    private Long id;
    private Date orderDate;
    private String paymentMethod;
    private Double totalAmount;
    private Double discount;
    private String orderStatus;
    private Date expectedDeliveryDate;
    private String shipmentTrackingNumber; // ✅ Add this
    private List<OrderItemDetailDto> orderItems;
    private Long addressId;
    private Map<String, String> credentials;
}

