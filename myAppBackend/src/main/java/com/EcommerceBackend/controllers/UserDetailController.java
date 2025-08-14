package com.EcommerceBackend.controllers;


import com.EcommerceBackend.dto.UserDetailsDto;
import com.EcommerceBackend.entities.User;
import com.EcommerceBackend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.GrantedAuthority;


import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserDetailController {


    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserDetailsDto> getUserProfile(Principal principal) {
        if (principal == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        User user = (User) userService.loadUserByUsername(principal.getName());

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        List<String> authorities = user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        UserDetailsDto userDetailsDto = UserDetailsDto.builder()
                .id(user.getId())
                .firstName(user.getName())
                .email(user.getEmail())
//                .phoneNumber(user.getPhoneNumber())
                .roles(user.getRoles())
                .addressList(user.getAddressList())
                .build();

        return ResponseEntity.ok(userDetailsDto);

    }
}
