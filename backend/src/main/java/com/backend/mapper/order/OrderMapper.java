package com.backend.mapper.order;

import com.backend.domain.order.OrderItem;
import com.backend.domain.order.OrderProduct;
import org.apache.ibatis.annotations.*;

import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface OrderMapper {

    @Options(useGeneratedKeys = true, keyProperty = "id")
    @Insert("""
                INSERT INTO order_item
                (customer_id, branch_id, total_price, state_id, request, is_take_out, options) VALUES
                (#{customerId}, #{branchId}, #{totalPrice}, 1, #{request}, #{isTakeOut}, #{options})
            """)
    int insertOrderItem(OrderItem orderItem);

    @Insert("""
                INSERT INTO order_product
                (order_item_id, product_id, count, options, total_price) VALUES
                (#{orderItemId}, #{productId}, #{count}, #{options}, #{totalPrice})
            """)
    int insertOrderProduct(OrderProduct orderProduct);

    // TODO.나중에 시간 제약 추가
    @Select("""
                <script>
                             SELECT oi.id, oi.customer_id, oi.branch_id, oi.total_price, oi.state_id, oi.created_at, oi.is_take_out, b.branch_name, oi.request, oi.options
                             FROM order_item oi
                             JOIN branch b ON oi.branch_id = b.id
                             WHERE 1 = 1
                             <if test="stateId == null">
                                 AND oi.customer_id = #{customerId}
                                 <if test="period == 'week'">
                                     AND oi.created_at >= NOW() - INTERVAL 1 WEEK
                                 </if>
                                 <if test="period == 'month'">
                                     AND oi.created_at >= NOW() - INTERVAL 1 MONTH
                                 </if>
                                 <if test="period == '3-month'">
                                     AND oi.created_at >= NOW() - INTERVAL 3 MONTH
                                 </if>
                             </if>
                             <if test="stateId != null and branchId != null">
                                 AND oi.state_id = #{stateId} AND oi.branch_id = #{branchId}
                             </if>
                            <if test="startDateTime != null and endDateTime != null">
                            <![CDATA[
                                AND oi.created_at >= #{startDateTime} AND oi.created_at <= #{endDateTime}
                                ]]>
                            </if>
                             ORDER BY oi.created_at DESC
                         </script>
            """)
    List<OrderItem> selectOrderItemList(Integer customerId, String period, Integer stateId, Integer branchId, LocalDateTime startDateTime, LocalDateTime endDateTime);

    @Select("""
                SELECT oi.id, oi.customer_id, oi.branch_id, oi.total_price, oi.state_id, oi.created_at, oi.is_take_out, b.branch_name, p.provider, p.coupon_count, oi.options, oi.request
                FROM order_item oi JOIN branch b ON oi.branch_id = b.id JOIN payment p ON oi.id = p.order_item_id
                WHERE oi.id = #{id}
            """)
    OrderItem selectOrderItemWithPaymentByOrderId(Integer id);

    @Select("""
                SELECT op.id, op.order_item_id, op.product_id, op.count, op.options, op.total_price, pi.file_path, p.title productName
                FROM order_product op JOIN product_img pi ON op.product_id = pi.product_id
                JOIN product p ON op.product_id = p.id
                WHERE op.order_item_id = #{orderItemId}
            """)
    List<OrderProduct> selectOrderProductByOrderId(Integer orderItemId);

    @Update("""
            UPDATE order_item
            SET state_id = #{stateId} + 1
            WHERE id = #{id}
            """)
    int updateOrderItemState(Integer id, Integer stateId);

    @Select("""
                SELECT id
                FROM payment
                WHERE order_item_id = #{orderItemId}
            """)
    Integer selectPaymentIdByOrderId(Integer orderItemId);

    @Select("""
                SELECT oi.id, oi.customer_id, oi.branch_id, oi.total_price, oi.state_id, oi.created_at, oi.is_take_out, b.branch_name, oi.request, oi.options
                            FROM order_item oi JOIN branch b ON oi.branch_id = b.id
                            WHERE oi.id = #{id}
            """)
    OrderItem selectOrderItemByOrderId(Integer id);
}
