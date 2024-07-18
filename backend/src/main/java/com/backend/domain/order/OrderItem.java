package com.backend.domain.order;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

// 주문내역 하나
@Data
public class OrderItem {
    private Integer id;
    private Integer customerId;
    private Integer branchId;
    private Integer totalPrice;
    private Integer stateId;
    private LocalDateTime createdAt;
    // 주문내역의 상품 리스트
    private List<OrderProduct> orderProduct;
}
