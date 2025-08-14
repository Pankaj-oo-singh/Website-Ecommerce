package com.EcommerceBackend.dto;

import com.EcommerceBackend.entities.enums.Permission;
import com.EcommerceBackend.entities.enums.Role;
import lombok.Data;

import java.util.Set;

@Data
public class SignUpDto {
    private String email;
    private String password;
    private String name;
    private Set<Role> roles;
    private Set<Permission> permissions;
}
