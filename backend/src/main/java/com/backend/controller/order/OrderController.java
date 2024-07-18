package com.backend.controller.order;

import com.backend.domain.order.OrderItem;
import com.backend.service.order.OrderService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class OrderController {
    private final OrderService orderService;

    // 주문하기
    @PostMapping("/orders")
    public ResponseEntity addOrderItem(@RequestBody OrderItem orderItem) throws JsonProcessingException {
        orderService.addOrderItem(orderItem);
        // 스탬프 적립, 쿠폰 적립 로직 추가
        // 주문 완료 알림 추가
        return ResponseEntity.ok().build();
    }

    // 주문 리스트 조회
    @GetMapping("/orders/list")
    public ResponseEntity getOrderItemList(Authentication authentication) throws JsonProcessingException {
        return ResponseEntity.ok(orderService.getOrderItemList(Integer.valueOf(authentication.getName())));
    }

    // 주문 상세 조회
    @GetMapping("/orders/{id}")
    public ResponseEntity getOrderItem(@PathVariable Integer id) throws JsonProcessingException {
        return ResponseEntity.ok(orderService.getOrderItem(id));
    }

    // 주문 상태 변경 : 1.결제 완료 2. 제조 중 3. 제조 완료
    // id = order_id
    @PutMapping("/orders/{id}")
    public ResponseEntity modifyOrderItemState(@RequestParam Integer stateId, @PathVariable Integer id) {
        orderService.modifyOrderItemState(id, stateId);
        return ResponseEntity.ok().build();
    }
}
