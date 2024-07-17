package com.backend.mapper.order;

import com.backend.domain.order.OrderItem;
import com.backend.domain.order.OrderProduct;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

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
                SELECT *
                FROM order_product
                WHERE order_item_id = #{orderItemId}
            """)
    List<OrderProduct> selectOrderProductByOrderId(Integer orderItemId);
}
