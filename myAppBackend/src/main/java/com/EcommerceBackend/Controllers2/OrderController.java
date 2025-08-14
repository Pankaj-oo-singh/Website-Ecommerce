package com.EcommerceBackend.Controllers2;


import com.EcommerceBackend.dto.OrderRequestDto;
import com.EcommerceBackend.dto.OrderResponseDto;
import com.EcommerceBackend.service2.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class OrderController {


    private final OrderService orderService;

    @PostMapping("/create")
    public ResponseEntity<OrderResponseDto> createOrder(@RequestBody OrderRequestDto orderRequestDto) {
        OrderResponseDto response = orderService.createOrder(orderRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }

    @PostMapping("/cancel/{id}")
    public ResponseEntity<OrderResponseDto> cancelOrder(@PathVariable Long id, Principal principal) {
        OrderResponseDto response = orderService.cancelOrder(id, principal);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<List<OrderResponseDto>> getOrderByUser(Principal principal) {
        List<OrderResponseDto> orderResponseDto = orderService.getOrderByUser(principal);
        return ResponseEntity.ok(orderResponseDto);
    }


    @PostMapping("/update-payment")
    public ResponseEntity<?> updatePaymentStatus(@RequestBody Map<String, String> request) {
        try {
            Map<String, String> response = orderService.updateStatus(
                    request.get("paymentIntent"), request.get("status")
            );
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Internal server error"));
        }
    }





}
