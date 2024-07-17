package com.backend.domain.cart;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

// 장바구니
@Data
public class Cart {
    private Integer id;
    private Integer customerId;
    private Integer branchId;
    private Integer totalPrice;
    private LocalDateTime createdAt;
    // 장바구니의 상품 리스트
    private List<CartProduct> cartProduct;
}
