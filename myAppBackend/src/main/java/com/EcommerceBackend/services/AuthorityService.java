package com.EcommerceBackend.services;


import com.EcommerceBackend.entities.Authority;
import com.EcommerceBackend.repositories.AuthorityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class AuthorityService {

    private final AuthorityRepository authorityRepository;

    public List<Authority> getUserAuthority() {
        Authority authority = authorityRepository.findByRoleCode("USER");
        if (authority == null) {
            throw new IllegalStateException("Authority with role code 'USER' not found");
        }
        return List.of(authority);
    }

    public Authority createAuthority(String role, String description) {
        Authority authority = Authority.builder()
                .roleCode(role)
                .roleDescription(description)
                .build();
        return authorityRepository.save(authority);
    }
}
