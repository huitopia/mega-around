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
                SELECT *
                FROM order_item
                WHERE customer_id = #{customerId}
            """)
    List<OrderItem> selectOrderItemList(Integer customerId);

    @Select("""
                SELECT *
                FROM order_item
                WHERE id = #{id}
            """)
    OrderItem selectOrderItemByOrderId(Integer id);

    @Select("""
                SELECT op.id, op.order_item_id, op.product_id, op.count, op.options, op.total_price, pi.file_path
                FROM order_product op JOIN product_img pi ON op.product_id = pi.product_id
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
