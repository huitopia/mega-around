package com.backend.mapper.order;

import com.backend.domain.order.OrderItem;
import com.backend.domain.order.OrderProduct;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface OrderMapper {

    @Options(useGeneratedKeys = true, keyProperty = "id")
    @Insert("""
                INSERT INTO order_item
                (customer_id, branch_id, total_price, state_id) VALUES
                (#{customerId}, #{branchId}, #{totalPrice}, 1)
            """)
    int insertOrderItem(OrderItem orderItem);

    @Insert("""
                INSERT INTO order_product
                (order_item_id, product_id, count, options, total_price) VALUES
                (#{orderItemId}, #{productId}, #{count}, #{options}, #{totalPrice})
            """)
    int insertOrderProduct(OrderProduct orderProduct);

    @Select("""
                SELECT oi.id, oi.customer_id, oi.branch_id, oi.total_price, oi.state_id, oi.created_at, oi.is_take_out, b.branch_name
                FROM order_item oi JOIN branch b ON oi.branch_id = b.id
                WHERE oi.customer_id = #{customerId}
            """)
    List<OrderItem> selectOrderItemList(Integer customerId);

    @Select("""
                SELECT oi.id, oi.customer_id, oi.branch_id, oi.total_price, oi.state_id, oi.created_at, oi.is_take_out, b.branch_name
                FROM order_item oi JOIN branch b ON oi.branch_id = b.id
                WHERE oi.id = #{id}
            """)
    OrderItem selectOrderItemByOrderId(Integer id);

    @Select("""
                SELECT op.id, op.order_item_id, op.product_id, op.count, op.options, op.total_price, pi.file_path, p.title productName
                FROM order_product op JOIN product_img pi ON op.product_id = pi.product_id
                JOIN product p ON op.product_id = p.id
                WHERE op.order_item_id = #{orderItemId}
            """)
    List<OrderProduct> selectOrderProductByOrderId(Integer orderItemId);

    @Update("""
            UPDATE order_item
            SET state_id = #{stateId}
            WHERE id = #{id}
            """)
    int updateOrderItemState(Integer id, Integer stateId);
}
