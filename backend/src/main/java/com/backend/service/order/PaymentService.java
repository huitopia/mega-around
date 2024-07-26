package com.backend.service.order;

import com.backend.domain.order.OrderItem;
import com.backend.domain.order.Payment;
import com.backend.mapper.cart.CartMapper;
import com.backend.mapper.order.PaymentMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class PaymentService {
    private final PaymentMapper paymentMapper;
    private final OrderService orderService;
    private final CartMapper cartMapper;

    public Integer addPayment(OrderItem orderItem, Payment payment, Integer customerId) throws JsonProcessingException {
        // 주문 생성
        Integer orderId = orderService.addOrderItem(orderItem, customerId);
        payment.setOrderItemId(orderItem.getId());
        paymentMapper.insertPayment(payment);

        // 장바구니 삭제
        Integer cartId = cartMapper.selectCartIdByCustomerId(customerId);
        cartMapper.deleteCartProductByCustomerId(cartId);
        cartMapper.deleteCartByCustomerId(customerId);
        return orderId;
    }
}
