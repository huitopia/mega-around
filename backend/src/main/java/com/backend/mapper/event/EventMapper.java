package com.backend.mapper.event;

import com.backend.domain.event.Notice;
import org.apache.ibatis.annotations.*;

import java.util.List;

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
            (customer_id, count) VALUES (#{customerId}, #{count})
            """)
    int insertStamp(Integer customerId, Integer count);

    @Insert("""
            INSERT INTO coupon
            (customer_id, count) VALUES (#{customerId}, #{count})
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
                AND tag = #{tag}
                ORDER BY created_at DESC
            """)
    List<Notice> selectNoticeByCustomerId(Integer customerId, String tag);

    @Update("""
                UPDATE stamp
                SET count = #{count}
                WHERE customer_id = #{customerId}
            """)
    int updateStamp(Integer customerId, Integer count);

    @Insert("""
                INSERT INTO notice
                (customer_id, tag, content) VALUES (#{customerId}, #{tag}, #{content})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    int insertStateNotice(Notice notice);

    @Select("""
                SELECT *
                FROM notice
                WHERE customer_id = #{customerId}
                ORDER BY created_at DESC
                LIMIT 6;
            """)
    List<Notice> selectAllNoticeByCustomerId(Integer customerId);

    @Update("""
                UPDATE stamp
                SET count = count + #{count}
                WHERE customer_id = #{customerId}
            """)
    int addStamp(Integer customerId, Integer count);

    @Update("""
                UPDATE notice
                SET is_read = true
                WHERE customer_id = #{customerId}
            """)
    void updateNotice(Integer customerId);
}
