package com.EcommerceBackend.dto;


import com.EcommerceBackend.entities.Address;
import com.EcommerceBackend.entities.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailsDto {

    private Long id;
    private String firstName;
    private String phoneNumber;
    private String email;
//    private List<String> authorityList;

    private Set<Role> roles;
    private List<Address> addressList;
}
