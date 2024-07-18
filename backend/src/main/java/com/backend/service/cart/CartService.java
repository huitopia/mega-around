package com.backend.service.cart;

import com.backend.domain.cart.Cart;
import com.backend.domain.cart.CartProduct;
import com.backend.mapper.cart.CartMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.security.auth.message.config.AuthConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class CartService {
    private final CartMapper cartMapper;
    private final ObjectMapper objectMapper;

    public void addCart(Cart cart) throws JsonProcessingException {
        cartMapper.insertCart(cart);
        List<CartProduct> cartProductList = cart.getCartProduct();
        for(CartProduct cartProduct : cartProductList){
            cartProduct.setCartId(cart.getId());
            cartProduct.setOptions(objectMapper.writeValueAsString(cartProduct.getOption()));
            cartMapper.insertCartProduct(cartProduct);
        }
    }

    public Object getCart(Integer customerId) throws JsonProcessingException {
        Cart cart = cartMapper.selectCartByCustomerId(customerId);
        List<CartProduct> cartProductList = cartMapper.selectCartProductListByCartId(cart.getId());
        for(CartProduct cartProduct : cartProductList){
            cartProduct.setOption(objectMapper.readValue(cartProduct.getOptions(), List.class));
        }
        cart.setCartProduct(cartProductList);

        return cart;
    }
}
