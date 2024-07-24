package com.backend.mapper.event;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface EventMapper {

    @Select("""
            SELECT count
            FROM stamp
            WHERE customer_id = #{customerId}
            """)
    Integer selectStampByCustomerId(Integer customerId);

    @Select("""
    SELECT count
    FROM coupon
    WHERE customer_id = #{customerId}
""")
    Integer selectCouponByCustomerId(Integer customerId);
}
