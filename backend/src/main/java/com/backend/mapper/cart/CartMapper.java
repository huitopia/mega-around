package com.backend.mapper.cart;

import com.backend.domain.cart.Cart;
import com.backend.domain.cart.CartProduct;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface CartMapper {

    @Options(useGeneratedKeys = true, keyProperty = "id")
    @Insert("""
                INSERT INTO cart
                (customer_id, branch_id, total_price)
                VALUES (#{customerId}, #{branchId}, #{totalPrice})
            """)
    int insertCart(Cart cart);

    @Insert("""
                INSERT INTO cart_product
                (cart_id, product_id, count, total_price, options)
                VALUES (#{cartId}, #{productId}, #{count}, #{totalPrice}, #{options})
            """)
    int insertCartProduct(CartProduct cartProduct);

    @Select("""
                SELECT c.id, c.customer_id, c.branch_id, c.total_price, b.branch_name, c.created_at
                FROM cart c JOIN branch b ON c.branch_id = b.id
                WHERE c.customer_id = #{customerId}
            """)
    Cart selectCartByCustomerId(Integer customerId);

    @Select("""
                SELECT cp.cart_id, cp.product_id, cp.count, cp.total_price, cp.options, pi.file_path, p.title productName
                FROM cart_product cp
                    JOIN product_img pi ON cp.product_id = pi.product_id
                    JOIN product p ON cp.product_id = p.id
                WHERE cp.cart_id = #{cartId}
            """)
    List<CartProduct> selectCartProductListByCartId(Integer cartId);

    @Select("""
                SELECT id
                FROM cart
                WHERE customer_id = #{customerId}
            """)
    Integer selectCartIdByCustomerId(Integer customerId);

    @Delete("""
                DELETE FROM cart
                WHERE customer_id = #{customerId}
            """)
    int deleteCartByCustomerId(Integer customerId);


    @Delete("""
                DELETE FROM cart_product
                WHERE cart_id = #{cartId}
            """)
    int deleteCartProductByCustomerId(Integer cartId);

    @Delete("""
                DELETE FROM cart_product
                WHERE cart_id = #{cartId} AND product_id = #{productId}
            """)
    int deleteCartProductByProductId(Integer cartId, Integer productId);

    @Select("""
                SELECT *
                FROM cart_product
                WHERE cart_id = #{cartId} AND product_id = #{productId}
            """)
    CartProduct selectCartByProductId(Integer cartId, Integer productId);

    @Update("""
                UPDATE cart_product 
                SET count = #{count}, total_price = total_price + #{totalPrice}, options = #{options}
                WHERE product_id = #{productId} AND cart_id = #{cartId}
            """)
    int updateCartProduct(CartProduct cartProduct);
}
