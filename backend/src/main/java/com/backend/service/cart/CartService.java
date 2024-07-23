package com.backend.service.cart;

import com.backend.domain.cart.Cart;
import com.backend.domain.cart.CartProduct;
import com.backend.mapper.cart.CartMapper;
import com.backend.mapper.product.ProductMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class CartService {
    private final CartMapper cartMapper;
    private final ObjectMapper objectMapper;
    private final ProductMapper productMapper;

    public void addCart(Cart cart) throws JsonProcessingException {
        cartMapper.insertCart(cart);
        List<CartProduct> cartProductList = cart.getCartProduct();
        for (CartProduct cartProduct : cartProductList) {
            cartProduct.setCartId(cart.getId());
            cartProduct.setOptions(objectMapper.writeValueAsString(cartProduct.getOption()));
            cartMapper.insertCartProduct(cartProduct);
        }
    }

    public Object getCart(Integer customerId) throws JsonProcessingException {
        Cart cart = cartMapper.selectCartByCustomerId(customerId);
        List<CartProduct> cartProductList = cartMapper.selectCartProductListByCartId(cart.getId());
        for (CartProduct cartProduct : cartProductList) {
            List<Integer> optionList = objectMapper.readValue(cartProduct.getOptions(), List.class);
            List<String> optionListString = new ArrayList<>();
            for (Integer id : optionList) {
                optionListString.add(productMapper.selectOptionById(id));
            }
            cartProduct.setOptionList(optionListString);
        }
        cart.setCartProduct(cartProductList);

        return cart;
    }

    public void removeCartProduct(Integer customerId, Integer productId) {
        Integer cartId = cartMapper.selectCartIdByCustomerId(customerId);
        cartMapper.deleteCartProductByProductId(customerId, productId);
    }
}
