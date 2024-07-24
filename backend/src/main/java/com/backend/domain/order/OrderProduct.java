package com.backend.domain.order;

import lombok.Data;

import java.util.List;

// 주문내역에 있는 제품 하나
@Data
public class OrderProduct {
    private Integer id;
    private Integer orderItemId;
    private Integer productId;
    private String productName;
    private Integer count;
    // 옵션 포함한 총 가격
    private Integer totalPrice;
    // 선택한 옵션 리스트
    private List<Integer> option;
    private List<String> optionList;
    // 옵션 리스트 JSON 객체로 변환
    private String options;
    private String filePath;
}
