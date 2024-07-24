package com.backend.domain.order;

import lombok.Data;

@Data
public class PaymentDTO {
    private OrderItem orderItem;
    private Payment payment;
}
