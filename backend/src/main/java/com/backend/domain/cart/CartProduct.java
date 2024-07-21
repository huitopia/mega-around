package com.backend.domain.cart;

import lombok.Data;

import java.util.List;

// 카트에 담긴 제품 하나
@Data
public class CartProduct {
    private Integer cartId;
    private Integer productId;
    private String productName;
    private Integer count;
    // 옵션 포함한 가격
    private Integer totalPrice;
    // 선택한 옵션 리스트
    private List<Integer> option;
    // 옵션 리스트 JSON 객체로 변환
    private String options;
    private String filePath;
}
