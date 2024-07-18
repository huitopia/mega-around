package com.backend.mapper.cart;

import com.backend.domain.cart.Cart;
import com.backend.domain.cart.CartProduct;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;

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
    VALUES (#{cartId}, #{productId}, #{totalPrice}, #{options})
""")
    int insertCartProduct(CartProduct cartProduct);
}
