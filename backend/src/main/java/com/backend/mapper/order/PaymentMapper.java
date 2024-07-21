package com.backend.mapper.order;

import com.backend.domain.order.Payment;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PaymentMapper {

    @Insert("""
                INSERT INTO payment
                (order_item_id, total_price, provider, merchant_uid)
                VALUES (#{orderItemId}, #{totalPrice}, #{provider}, #{merchantUid})
            """)
    int insertPayment(Payment payment);
}
