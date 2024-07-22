package com.backend.domain.order;

import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

// 주문내역 하나
@Data
public class OrderItem {
    private Integer id;
    private Integer customerId;
    private Integer branchId;
    private String branchName;
    private String provider;
    private Integer totalPrice;
    private Integer stateId;
    private String request;
    // 1 : 포장 , 2 : 매장
    private String isTakeOut;
    // 쿠폰 사용 횟수
    private Integer couponCount;
    private List<String> option;
    // db 저장시 JSON 객체로 변환
    private String options;
    private LocalDateTime createdAt;
    // 주문내역의 상품 리스트
    private List<OrderProduct> orderProduct;

    public String getCreatedAtString() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy. MM. dd. HH:mm");
        return createdAt.format(formatter).toString();
    }
}
