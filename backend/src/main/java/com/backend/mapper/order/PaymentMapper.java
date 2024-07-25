package com.backend.mapper.order;

import com.backend.domain.order.Payment;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PaymentMapper {

    @Insert("""
                INSERT INTO payment
                (order_item_id, total_price, provider, merchant_uid, coupon_count)
                VALUES (#{orderItemId}, #{totalPrice}, #{provider}, #{merchantUid}, #{couponCount})
            """)
    int insertPayment(Payment payment);
}
