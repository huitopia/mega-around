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
    @PostMapping("/order")
    public ResponseEntity addOrderItem(@RequestBody OrderItem orderItem) throws JsonProcessingException {
        orderService.addOrderItem(orderItem);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/order")
    public ResponseEntity getOrderItems(Authentication authentication) throws JsonProcessingException {
        return ResponseEntity.ok(orderService.getOrderItemList(Integer.valueOf(authentication.getName())));
    }
}
