package com.EcommerceBackend.service2;


import com.EcommerceBackend.dto.OrderItemDetailDto;
import com.EcommerceBackend.dto.OrderRequestDto;
import com.EcommerceBackend.dto.OrderResponseDto;
import com.EcommerceBackend.dto.ProductDto;
import com.EcommerceBackend.entities.*;

import com.EcommerceBackend.repositories.OrderRepository;
import com.EcommerceBackend.repositories.UserRepository;
import com.EcommerceBackend.repositories2.AddressRepository;
import com.EcommerceBackend.repositories2.OrderItemRepository;
import com.EcommerceBackend.repositories2.ProductRepository;
import com.EcommerceBackend.services.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class OrderService {







        private final OrderRepository orderRepository;
        private final OrderItemRepository orderItemRepository;
        private final ProductRepository productRepository;
        private final UserRepository userRepository;
        private final AddressRepository addressRepository;
        private final ModelMapper modelMapper;
        private final UserService userService;
        private final PaymentIntentService paymentIntentService;
        private final ProductService productService;





//    @Transactional
//    public OrderResponseDto createOrder(OrderRequestDto requestDto) {
//        // Fetch User and Address
//        User user = userRepository.findById(requestDto.getUserId())
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        Address address = addressRepository.findById(requestDto.getAddressId())
//                .orElseThrow(() -> new RuntimeException("Address not found"));
//
//        // Create Order
//        Order order = new Order();
//        order.setUser(user);
//        order.setAddress(address);
//        order.setOrderDate(requestDto.getOrderDate());
//        order.setTotalAmount(requestDto.getTotalAmount());
//        order.setDiscount(requestDto.getDiscount());
//        order.setPaymentMethod(requestDto.getPaymentMethod());
//        order.setExpectedDeliveryDate(requestDto.getExpectedDeliveryDate());
//        order.setOrderStatus(OrderStatus.IN_PROGRESS);
//
//        // Create Order Items
//        List<OrderItem> orderItems = requestDto.getOrderItemRequests().stream().map(itemDto -> {
//            ProductDto productDto = productService.getProductById(itemDto.getProductId());
//            Product product = modelMapper.map(productDto, Product.class);
//
//            OrderItem orderItem = new OrderItem();
//            orderItem.setProduct(product);
//            orderItem.setProductVariantId(itemDto.getProductVariantId());
//            orderItem.setQuantity(itemDto.getQuantity());
//            orderItem.setItemPrice(itemDto.getDiscount()); // You may want to change this if it's not the price
//            orderItem.setOrder(order);
//            return orderItem;
//        }).collect(Collectors.toList());
//
//        order.setOrderItemList(orderItems);
//
//        // Save Order first to get ID for Stripe metadata
//        Order savedOrder = orderRepository.save(order);
//
//        Map<String, String> stripeCredentials = null;
//        if ("CARD".equalsIgnoreCase(requestDto.getPaymentMethod())) {
//            stripeCredentials = paymentIntentService.createPaymentIntent(savedOrder);
//
//            // ✅ Correctly extract and save Stripe paymentIntentId
//            String paymentIntentId = stripeCredentials.get("payment_intent_id");
//            savedOrder.setStripePaymentIntentId(paymentIntentId);
//            orderRepository.save(savedOrder); // Save again to persist intent ID
//        }
//
//        // Prepare Response DTO
//        OrderResponseDto responseDto = new OrderResponseDto();
//        responseDto.setId(savedOrder.getId());
//        responseDto.setOrderDate(savedOrder.getOrderDate());
//        responseDto.setPaymentMethod(savedOrder.getPaymentMethod());
//        responseDto.setTotalAmount(savedOrder.getTotalAmount());
//        responseDto.setDiscount(savedOrder.getDiscount());
//        responseDto.setOrderStatus(savedOrder.getOrderStatus().name());
//        responseDto.setExpectedDeliveryDate(savedOrder.getExpectedDeliveryDate());
//
//        responseDto.setAddressId(savedOrder.getAddress().getId());
//
//        // Set order items
//        List<OrderItemDetailDto> itemDetails = savedOrder.getOrderItemList().stream().map(item -> {
//            OrderItemDetailDto detailDto = new OrderItemDetailDto();
//            detailDto.setId(item.getId());
//            detailDto.setProductId(item.getProduct().getId());
//            detailDto.setProductName(item.getProduct().getName());
//            detailDto.setProductVariantId(item.getProductVariantId());
//            detailDto.setItemPrice(item.getItemPrice());
//            detailDto.setQuantity(item.getQuantity());
//            return detailDto;
//        }).collect(Collectors.toList());
//
//        responseDto.setOrderItems(itemDetails);
//
//        // Attach Stripe credentials if available
//        if (stripeCredentials != null) {
//            responseDto.setCredentials(stripeCredentials);
//        }
//
//        return responseDto;
//    }
//
//
//
    public OrderResponseDto cancelOrder(Long id, Principal principal) {
        // Fetch authenticated user
        User user = (User) userService.loadUserByUsername(principal.getName());

        // Get the order
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Check ownership
        if (!order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You are not authorized to cancel this order");
        }

        // Check if order can be cancelled
        if (order.getOrderStatus() == OrderStatus.CANCELLED || order.getOrderStatus() == OrderStatus.DELIVERED) {
            throw new RuntimeException("Order cannot be cancelled at this stage");
        }

        // Update order status
        order.setOrderStatus(OrderStatus.CANCELLED);

        // TODO: Add refund logic here if needed

        // Save updated order
        Order cancelledOrder = orderRepository.save(order);

        // Map and return response DTO
        return modelMapper.map(cancelledOrder, OrderResponseDto.class);
    }

    @Transactional
    public OrderResponseDto createOrder(OrderRequestDto requestDto) {
        // Fetch User and Address
        User user = userRepository.findById(requestDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Address address = addressRepository.findById(requestDto.getAddressId())
                .orElseThrow(() -> new RuntimeException("Address not found"));

        // Create Order
        Order order = new Order();
        order.setUser(user);
        order.setAddress(address);
        order.setOrderDate(requestDto.getOrderDate());
        order.setTotalAmount(requestDto.getTotalAmount());
        order.setDiscount(requestDto.getDiscount());
        order.setPaymentMethod(requestDto.getPaymentMethod());
        order.setExpectedDeliveryDate(requestDto.getExpectedDeliveryDate());
        order.setOrderStatus(OrderStatus.IN_PROGRESS);

        // Set a default or temporary shipment tracking number
        // You can replace this with a real tracking number once available
        order.setShipmentTrackingNumber("TEMP_TRACKING_" + System.currentTimeMillis()); // Example format

        // Create Order Items
        List<OrderItem> orderItems = requestDto.getOrderItemRequests().stream().map(itemDto -> {
            ProductDto productDto = productService.getProductById(itemDto.getProductId());
            Product product = modelMapper.map(productDto, Product.class);

            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setProductVariantId(itemDto.getProductVariantId());
            orderItem.setQuantity(itemDto.getQuantity());
            orderItem.setItemPrice(itemDto.getPrice()); // You may want to change this if it's not the price
            orderItem.setOrder(order);
            return orderItem;
        }).collect(Collectors.toList());

        order.setOrderItemList(orderItems);

        // Save Order first to get ID for Stripe metadata
        Order savedOrder = orderRepository.save(order);

        Map<String, String> stripeCredentials = null;
        if ("CARD".equalsIgnoreCase(requestDto.getPaymentMethod())) {
            stripeCredentials = paymentIntentService.createPaymentIntent(savedOrder);

            // ✅ Correctly extract and save Stripe paymentIntentId
            String paymentIntentId = stripeCredentials.get("payment_intent_id");
            savedOrder.setStripePaymentIntentId(paymentIntentId);
            orderRepository.save(savedOrder); // Save again to persist intent ID
        }

        // Prepare Response DTO
        OrderResponseDto responseDto = new OrderResponseDto();
        responseDto.setId(savedOrder.getId());
        responseDto.setOrderDate(savedOrder.getOrderDate());
        responseDto.setPaymentMethod(savedOrder.getPaymentMethod());
        responseDto.setTotalAmount(savedOrder.getTotalAmount());
        responseDto.setDiscount(savedOrder.getDiscount());
        responseDto.setOrderStatus(savedOrder.getOrderStatus().name());
        responseDto.setExpectedDeliveryDate(savedOrder.getExpectedDeliveryDate());
        responseDto.setAddressId(savedOrder.getAddress().getId());
        responseDto.setShipmentTrackingNumber(savedOrder.getShipmentTrackingNumber());



        // Set order items
        List<OrderItemDetailDto> itemDetails = savedOrder.getOrderItemList().stream().map(item -> {
            OrderItemDetailDto detailDto = new OrderItemDetailDto();
            detailDto.setId(item.getId());
            detailDto.setProductId(item.getProduct().getId());
            detailDto.setProductName(item.getProduct().getName());
            detailDto.setProductVariantId(item.getProductVariantId());
            detailDto.setItemPrice(item.getItemPrice());
            detailDto.setQuantity(item.getQuantity());
            return detailDto;
        }).collect(Collectors.toList());

        responseDto.setOrderItems(itemDetails);

        // Attach Stripe credentials if available
        if (stripeCredentials != null) {
            responseDto.setCredentials(stripeCredentials);
        }

        return responseDto;
    }


    public List<OrderResponseDto> getOrderByUser(Principal principal) {
        User user = (User) userService.loadUserByUsername(principal.getName());
        List<Order> userOrders = orderRepository.findByUserId(user.getId());

        return userOrders.stream().map(order -> {
            OrderResponseDto dto = modelMapper.map(order, OrderResponseDto.class);

            // Manually map order items
            List<OrderItemDetailDto> itemDtos = order.getOrderItemList().stream()
                    .map(item -> {
                        OrderItemDetailDto itemDto = new OrderItemDetailDto();
                        itemDto.setId(item.getId());
                        itemDto.setProductId(item.getProduct().getId());
                        itemDto.setProductName(item.getProduct().getName());
                        itemDto.setProductVariantId(item.getProductVariantId());
                        itemDto.setQuantity(item.getQuantity());
                        itemDto.setItemPrice(item.getItemPrice());
                        return itemDto;
                    })
                    .collect(Collectors.toList());

            dto.setOrderItems(itemDtos);
            return dto;
        }).collect(Collectors.toList());
    }


    public Map<String, String> updateStatus(String paymentIntentId, String status) {
        if (paymentIntentId == null || status == null) {
            throw new IllegalArgumentException("paymentIntent and status must be provided");
        }

        // Find order by payment intent ID
        Order order = orderRepository.findByStripePaymentIntentId(paymentIntentId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found for paymentIntent: " + paymentIntentId));

        // Optional: map Stripe statuses to OrderStatus enum
        OrderStatus newStatus;
        switch (status.toLowerCase()) {
            case "succeeded":
            case "paid":
                newStatus = OrderStatus.SHIPPED; // or PAID if you add that to your enum
                break;
            case "processing":
                newStatus = OrderStatus.IN_PROGRESS;
                break;
            case "cancelled":
            case "failed":
                newStatus = OrderStatus.CANCELLED;
                break;
            default:
                throw new IllegalArgumentException("Invalid status value: " + status);
        }

        order.setOrderStatus(newStatus);
        orderRepository.save(order);

        return Collections.singletonMap("message", "Order status updated to " + newStatus.name());
    }







}
