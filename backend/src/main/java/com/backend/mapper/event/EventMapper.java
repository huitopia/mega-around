package com.backend.mapper.event;

import com.backend.domain.event.Notice;
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
            INSERT INTO stamp
            (count, customer_id) VALUES (#{count}, #{customerId})
            """)
    int insertStamp(Integer customerId, Integer count);

    @Insert("""
            INSERT INTO coupon
            (count, customer_id) VALUES (#{count}, #{customerId})
            """)
    int insertCoupon(Integer customerId, Integer count);

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
                SET count = count + #{newCount}
                WHERE customer_id = #{customerId}
            """)
    int updateCoupon(Integer customerId, Integer newCount);

    @Insert("""
                INSERT INTO notice
                (customer_id, tag, content) VALUES (#{customerId}, #{tag}, #{content})
            """)
    int insertNotice(Integer customerId, String tag, String content);

    @Select("""
                SELECT *
                FROM notice
                WHERE customer_id = #{customerId}
            """)
    Notice selectNoticeByCustomerId(Integer customerId);

    @Update("""
                UPDATE stamp
                SET count = #{count}
                WHERE customer_id = #{customerId}
            """)
    int updateStamp(Integer customerId, Integer count);
}
