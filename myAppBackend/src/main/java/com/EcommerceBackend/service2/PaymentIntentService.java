package com.EcommerceBackend.service2;

import com.EcommerceBackend.entities.Order;
import com.EcommerceBackend.entities.User;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
@Component

public class PaymentIntentService {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }

    public Map<String, String> createPaymentIntent(Order order) {
        try {
            User user = order.getUser();

            Map<String, String> metadata = new HashMap<>();
            metadata.put("orderId", order.getId().toString());
            metadata.put("userId", user.getId().toString());

            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount((long) (order.getTotalAmount() * 100)) // amount in paise (INR)
                    .setCurrency("inr")
                    .putAllMetadata(metadata)
                    .setDescription("Payment for Order ID: " + order.getId())
                    .setAutomaticPaymentMethods(
                            PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                    .setEnabled(true)
                                    .build()
                    )
                    .build();

            PaymentIntent paymentIntent = PaymentIntent.create(params);

            Map<String, String> response = new HashMap<>();
            response.put("client_secret", paymentIntent.getClientSecret());
            response.put("payment_intent_id", paymentIntent.getId());
            return response;

        } catch (StripeException e) {
            throw new RuntimeException("Failed to create payment intent", e);
        }
    }

}