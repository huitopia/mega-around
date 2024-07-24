package com.backend.service.order;

import com.backend.domain.order.OrderItem;
import com.backend.domain.order.Payment;
import com.backend.mapper.cart.CartMapper;
import com.backend.mapper.order.OrderMapper;
import com.backend.mapper.order.PaymentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(rollbackFor = Exception.class)
public class PaymentService {
    private final PaymentMapper paymentMapper;
    private final OrderMapper orderMapper;
    private final CartMapper cartMapper;

    public void addPayment(OrderItem orderItem, Payment payment, Integer customerId) {
        // 주문 생성
        orderMapper.insertOrderItem(orderItem);
        payment.setOrderItemId(orderItem.getId());
        paymentMapper.insertPayment(payment);

        // 장바구니 삭제
        Integer cartId = cartMapper.selectCartIdByCustomerId(customerId);
        cartMapper.deleteCartProductByCustomerId(cartId);
        cartMapper.deleteCartByCustomerId(customerId);

        // 스탬프 발급 및 알림 추가

        // 스탬프 10개 이상이면 쿠폰으로 교환 및 알림 추가
    }
}
