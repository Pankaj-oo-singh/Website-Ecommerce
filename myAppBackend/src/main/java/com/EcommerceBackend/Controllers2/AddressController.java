package com.EcommerceBackend.Controllers2;

import com.EcommerceBackend.dto.AddressDto;
import com.EcommerceBackend.service2.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/address")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AddressController {

    private final AddressService addressService;

    @PostMapping
    public ResponseEntity<AddressDto> createAddress(@RequestBody AddressDto addressDto, Principal principal) {
        AddressDto createdAddress = addressService.createAddress(addressDto, principal);
        return new ResponseEntity<>(createdAddress, HttpStatus.CREATED);
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAddress(@PathVariable("id") Long addressId) {
        addressService.deleteAddress(addressId);
        return ResponseEntity.ok().build();
    }


}
