package com.EcommerceBackend.service2;


import com.EcommerceBackend.dto.AddressDto;
import com.EcommerceBackend.entities.Address;
import com.EcommerceBackend.entities.User;
import com.EcommerceBackend.exceptions.ResourceNotFoundException;
import com.EcommerceBackend.repositories.UserRepository;
import com.EcommerceBackend.repositories2.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;






    public AddressDto createAddress(AddressDto addressDto, Principal principal) {
        // Get the logged-in user's email from Principal
        String username = principal.getName();

        // Find the user from DB
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Map DTO to entity
        Address address = modelMapper.map(addressDto, Address.class);

        // Set user manually
        address.setUser(user);

        // Save address
        Address savedAddress = addressRepository.save(address);

        // Convert entity back to DTO
        return modelMapper.map(savedAddress, AddressDto.class);
    }


//    public void deleteAddress(Long addressId){
//
//    addressRepository.deleteById(addressId);
//
//
//    }


    public void deleteAddress(Long addressId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Address not found with id: " + addressId));

        addressRepository.delete(address);
    }

}
