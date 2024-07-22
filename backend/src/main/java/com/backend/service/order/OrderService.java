package com.backend.service.order;

import com.backend.domain.order.OrderItem;
import com.backend.domain.order.OrderProduct;
import com.backend.mapper.order.OrderMapper;
import com.backend.mapper.product.ProductMapper;
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

    public void addOrderItem(OrderItem orderItem) throws JsonProcessingException {
        orderMapper.insertOrderItem(orderItem);
        List<OrderProduct> orderProductList = orderItem.getOrderProduct();
        for (OrderProduct orderProduct : orderProductList) {
            orderProduct.setOrderItemId(orderItem.getId());
            orderProduct.setOptions(objectMapper.writeValueAsString(orderProduct.getOption()));
            orderMapper.insertOrderProduct(orderProduct);
        }
    }

    public List<OrderItem> getOrderItemList(Integer customerId, String period) throws JsonProcessingException {
        List<OrderItem> orderItemList = orderMapper.selectOrderItemList(customerId, period);
        for (OrderItem orderItem : orderItemList) {
            List<OrderProduct> orderProductList = orderMapper.selectOrderProductByOrderId(orderItem.getId());
            for (OrderProduct orderProduct : orderProductList) {
                orderProduct.setOption(objectMapper.readValue(orderProduct.getOptions(), List.class));
            }

            orderItem.setOrderProduct(orderProductList);
        }

        return orderItemList;
    }

    public OrderItem getOrderItem(Integer id) throws JsonProcessingException {

        OrderItem orderItem = orderMapper.selectOrderItemByOrderId(id);

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
