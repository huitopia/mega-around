package com.backend.controller.cart;

import com.backend.domain.cart.Cart;
import com.backend.service.cart.CartService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Description;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class CartController {
    private final CartService cartService;

    @PreAuthorize("isAuthenticated()")
    @PostMapping("carts")
    @Description("장바구니 추가")
    public ResponseEntity addCart(@RequestBody Cart cart) throws JsonProcessingException {
        System.out.println("cart.toString() = " + cart.toString());
        cartService.addCart(cart);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("carts")
    @Description("장바구니 조회")
    public ResponseEntity getCart(Authentication authentication) throws JsonProcessingException {
//        return ResponseEntity.ok(cartService.getCart(Integer.valueOf(authentication.getName())));
        return ResponseEntity.ok(cartService.getCart(1));
    }

    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("carts/{productId}")
    @Description("장바구니 상품 삭제")
    public ResponseEntity removeCartProduct(Authentication authentication, @PathVariable Integer productId) {
//        cartService.removeCartProduct(Integer.valueOf(authentication.getName()),productId);
        cartService.removeCartProduct(1, productId);
        return null;
    }
}
