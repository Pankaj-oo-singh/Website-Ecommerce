package com.EcommerceBackend.dto;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressDto {


    private Long id;
    private String name;
    private String street;
    private String city;
    private String state;
    private String zipCode;
    private String phoneNumber;
}
