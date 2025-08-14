package com.EcommerceBackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class OrderItemDetailDto {




    private Long id;
    private Long productId;
    private String productName;

    private Long productVariantId;
    private Integer quantity;
    private Double itemPrice;
}
