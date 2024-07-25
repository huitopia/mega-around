package com.backend.mapper.event;

import org.apache.ibatis.annotations.*;

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

    @Insert("""
    INSERT INTO stmap
    (count) VALUES (#{count})
    WHERE customer_id = customerId
    """)
    int insertStamp(Integer customerId);

    @Insert("""
    INSERT INTO coupon
    (count) VALUES (#{count})
    WHERE customer_id = customerId
""")
    int insertCoupon(Integer customerId);

    @Delete("""
    DELETE FROM stamp
    WHERE customer_id = #{customerId}
""")
    int deleteStamp(Integer customerId);

    @Delete("""
            DELETE FROM coupon
            WHERE customer_id = #{customerId}
            """)
    int deleteCoupon(Integer customerId);

    @Update("""
    UPDATE coupon
    SET count = #{count}
    WHERE customer_id = #{customerId}
""")
    int updateCoupon(Integer customerId);

    @Insert("""
    INSERT INTO notice
    (customer_id, tag, content) VALUES (#{customerId}, #{tag}, #{content})
""")
    int insertNotice(Integer customerId, Integer tag, Integer content);

    @Select("""
    SELECT *
    FROM notice
    WHERE customer_id = #{customerId}
""")
    Notice selectNoticeByCustomerId(Integer customerId);
}
