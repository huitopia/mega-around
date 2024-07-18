package com.backend.controller.cart;

import com.backend.domain.cart.Cart;
import com.backend.service.cart.CartService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class CartController {
    private final CartService cartService;

    // 장바구니 추가
    @PostMapping("carts")
    public ResponseEntity addCart(Cart cart) throws JsonProcessingException {
        cartService.addCart(cart);
        return ResponseEntity.ok().build();
    }
}
