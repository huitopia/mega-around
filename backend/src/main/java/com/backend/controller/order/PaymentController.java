package com.backend.controller.order;

import com.backend.domain.order.OrderItem;
import com.backend.domain.order.Payment;
import com.backend.domain.order.PaymentDTO;
import com.backend.service.order.PaymentService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping("/payments")
    public void addPayment(@RequestBody PaymentDTO paymentDto, Authentication authentication) throws JsonProcessingException {
        OrderItem orderItem = paymentDto.getOrderItem();
        Payment payment = paymentDto.getPayment();
        paymentService.addPayment(orderItem, payment, Integer.valueOf(authentication.getName()));
//        paymentService.addPayment(orderItem, payment, 1);
    }
}
