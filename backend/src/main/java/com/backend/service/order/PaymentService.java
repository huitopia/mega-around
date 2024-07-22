package com.backend.service.order;

import com.backend.domain.order.Payment;
import com.backend.mapper.order.PaymentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class PaymentService {
    private final PaymentMapper paymentMapper;

    public void addPayment(Payment payment) {
        paymentMapper.insertPayment(payment);
    }
}
