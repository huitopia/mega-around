package com.backend.service.order;

import com.backend.domain.order.OrderItem;
import com.backend.domain.order.OrderProduct;
import com.backend.mapper.event.EventMapper;
import com.backend.mapper.order.OrderMapper;
import com.backend.mapper.product.ProductMapper;
import com.backend.service.event.EventService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class OrderService {
    private final OrderMapper orderMapper;
    private final ObjectMapper objectMapper;
    private final ProductMapper productMapper;
    private final EventService eventService;

    public void addOrderItem(OrderItem orderItem, Integer customerId) throws JsonProcessingException {
        // 포장 옵션
        orderItem.setOptions(objectMapper.writeValueAsString(orderItem.getOption()));
        orderMapper.insertOrderItem(orderItem);
        List<OrderProduct> orderProductList = orderItem.getOrderProduct();
        Integer totalCount = 0;
        for (OrderProduct orderProduct : orderProductList) {
            orderProduct.setOrderItemId(orderItem.getId());
            // 상품 옵션
            // TODO. 상품 옵션 저장 안됨
            System.out.println("orderProduct.getOption().get(0) = " + orderProduct.getOption().get(0));
            orderProduct.setOptions(objectMapper.writeValueAsString(orderProduct.getOption()));
            orderMapper.insertOrderProduct(orderProduct);
            totalCount += orderProduct.getCount();
        }
        eventService.addStamp(orderItem.getCustomerId(), totalCount);
    }

    public List<OrderItem> getOrderItemList(Integer customerId, String period, Integer stateId,Integer branchId) throws JsonProcessingException {
        List<OrderItem> orderItemList = orderMapper.selectOrderItemList(customerId, period, stateId, branchId);
        for (OrderItem orderItem : orderItemList) {
            List<OrderProduct> orderProductList = orderMapper.selectOrderProductByOrderId(orderItem.getId());
            // TODO. 필요없는 데이터 주석 처리
            for (OrderProduct orderProduct : orderProductList) {
                List<Integer> optionList = objectMapper.readValue(orderProduct.getOptions(), List.class);
                List<String> optionListString = new ArrayList<>();
                for (Integer optionId : optionList) {
                    optionListString.add(productMapper.selectOptionById(optionId));
                }
                orderProduct.setOptionList(optionListString);
            }

            orderItem.setOrderProduct(orderProductList);
        }

        return orderItemList;
    }

    public OrderItem getOrderItem(Integer id) throws JsonProcessingException {
        Integer paymentId = orderMapper.selectPaymentIdByOrderId(id);
        OrderItem orderItem = null;
        if(paymentId != null){
            orderItem = orderMapper.selectOrderItemWithPaymentByOrderId(id);
        } else {
            orderItem = orderMapper.selectOrderItemByOrderId(id);
        }

        // 주문 정보에 주문 상품 담기
        List<OrderProduct> orderProductList = orderMapper.selectOrderProductByOrderId(orderItem.getId());
        for (OrderProduct orderProduct : orderProductList) {
            List<Integer> optionList = objectMapper.readValue(orderProduct.getOptions(), List.class);
            List<String> optionListString = new ArrayList<>();
            for (Integer optionId : optionList) {
                optionListString.add(productMapper.selectOptionById(optionId));
            }
            orderProduct.setOptionList(optionListString);
        }

        orderItem.setOrderProduct(orderProductList);

        return orderItem;
    }

    public void modifyOrderItemState(Integer id, Integer stateId) {
        orderMapper.updateOrderItemState(id, stateId);
        // 상태 변경 알림 추가
//        orderMapper.insertNotice();
    }
}
