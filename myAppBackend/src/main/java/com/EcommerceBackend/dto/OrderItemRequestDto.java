package com.EcommerceBackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class OrderItemRequestDto {

    private Long productId;
    private Long productVariantId;
    private Double discount;
    private Integer quantity;
    private Double price;
}
