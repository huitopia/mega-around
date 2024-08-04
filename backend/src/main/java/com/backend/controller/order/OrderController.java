package com.backend.controller.order;

import com.backend.domain.order.OrderItem;
import com.backend.service.order.OrderService;
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
public class OrderController {
    private final OrderService orderService;

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/orders")
    @Description("주문 생성")
    public ResponseEntity addOrderItem(@RequestBody OrderItem orderItem, Authentication authentication) throws JsonProcessingException {
        Integer orderId = orderService.addOrderItem(orderItem, Integer.valueOf(authentication.getName()));
        return ResponseEntity.ok(orderId);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/orders/list")
    @Description("주문 리스트 조회")
    public ResponseEntity getOrderItemList(Authentication authentication, String period, Integer stateId, Integer branchId, @RequestParam(required = false) String date, @RequestParam(required = false) String startTime, @RequestParam(required = false) String endTime) throws JsonProcessingException {
        return ResponseEntity.ok(orderService.getOrderItemList(Integer.valueOf(authentication.getName()), period, stateId, branchId, date, startTime, endTime));
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/orders/{id}")
    @Description("주문 상세 조회")
    public ResponseEntity getOrderItem(@PathVariable Integer id) throws JsonProcessingException {
        return ResponseEntity.ok(orderService.getOrderItem(id));
    }

    // 주문 상태 변경 : 1.결제 완료 2. 제조 중 3. 제조 완료
    // id = order_id
//    @PreAuthorize("hasAuthority('SCOPE_branch')")
    @PutMapping("/orders")
    @Description("주문 상태 변경")
    public ResponseEntity modifyOrderItemState(@RequestBody OrderItem orderItem) {
        if (orderService.modifyOrderItemState(orderItem)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.internalServerError().build();
    }
}
