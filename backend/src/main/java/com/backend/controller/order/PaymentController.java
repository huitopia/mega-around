package com.backend.controller.order;

import com.backend.domain.order.Payment;
import com.backend.service.order.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping("/payment")
    public void addPayment(@RequestBody Payment payment) {
        paymentService.addPayment(payment);
    }
}
