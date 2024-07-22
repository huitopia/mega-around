package com.backend.domain.cart;

import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

// 장바구니
@Data
public class Cart {
    private Integer id;
    private Integer customerId;
    private Integer branchId;
    private String branchName;
    private Integer totalPrice;
    private LocalDateTime createdAt;
    // 장바구니의 상품 리스트
    private List<CartProduct> cartProduct;

    public String getCreatedAtString() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy. MM. dd. HH:mm");
        return createdAt.format(formatter).toString();
    }
}
