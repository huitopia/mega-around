package com.backend.service.order;

import com.backend.domain.event.Notice;
import com.backend.domain.order.OrderItem;
import com.backend.domain.order.OrderProduct;
import com.backend.mapper.event.EventMapper;
import com.backend.mapper.order.OrderMapper;
import com.backend.mapper.product.ProductMapper;
import com.backend.service.event.EventService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
    private final EventMapper eventMapper;
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
    private final SimpMessagingTemplate messagingTemplate;

    public Integer addOrderItem(OrderItem orderItem, Integer customerId) throws JsonProcessingException {
        // 포장 옵션
        orderItem.setOptions(objectMapper.writeValueAsString(orderItem.getOption()));
        orderMapper.insertOrderItem(orderItem);
        List<OrderProduct> orderProductList = orderItem.getOrderProduct();
        Integer totalCount = 0;
        for (OrderProduct orderProduct : orderProductList) {
            orderProduct.setOrderItemId(orderItem.getId());
            orderProduct.setOptions(objectMapper.writeValueAsString(orderProduct.getOption()));
            orderMapper.insertOrderProduct(orderProduct);
            totalCount += orderProduct.getCount();
        }

        eventService.addStamp(orderItem.getCustomerId(), totalCount, orderItem.getCouponCount());
        return orderItem.getId();
    }

    public List<OrderItem> getOrderItemList(Integer customerId, String period, Integer stateId, Integer branchId, String date, String startTime, String endTime) throws JsonProcessingException {
        // 날짜+시간 데이터 변환
        LocalDateTime startDateTime = parseDateTime(date, startTime);
        LocalDateTime endDateTime = parseDateTime(date, endTime);

        List<OrderItem> orderItemList = orderMapper.selectOrderItemList(customerId, period, stateId, branchId, startDateTime, endDateTime);
        for (OrderItem orderItem : orderItemList) {
            List<OrderProduct> orderProductList = orderMapper.selectOrderProductByOrderId(orderItem.getId());
            // 포장 옵션 리스트 변환
            List<Boolean> option = objectMapper.readValue(orderItem.getOptions(), List.class);
            orderItem.setOption(option);
            for (OrderProduct orderProduct : orderProductList) {
                List<Integer> optionList = objectMapper.readValue(orderProduct.getOptions(), List.class);
                List<String> optionListString = new ArrayList<>();
                if (optionList != null && !optionList.isEmpty()) {
                    for (Integer optionId : optionList) {
                        optionListString.add(productMapper.selectOptionById(optionId));
                    }
                }
                orderProduct.setOptionList(optionListString);
            }

            orderItem.setOrderProduct(orderProductList);
        }

        return orderItemList;
    }

    private static LocalDateTime parseDateTime(String date, String time) {
        if (date != null && !date.isEmpty() && time != null && !time.isEmpty()) {
            String dateTimeStr = date + " " + time;
            return LocalDateTime.parse(dateTimeStr, FORMATTER);
        }
        return null;
    }

    public OrderItem getOrderItem(Integer id) throws JsonProcessingException {
        Integer paymentId = orderMapper.selectPaymentIdByOrderId(id);
        OrderItem orderItem = null;
        if (paymentId != null) {
            orderItem = orderMapper.selectOrderItemWithPaymentByOrderId(id);
        } else {
            orderItem = orderMapper.selectOrderItemByOrderId(id);
        }
        // 포장 옵션 List로 변환
        List<Boolean> option = objectMapper.readValue(orderItem.getOptions(), List.class);
        orderItem.setOption(option);

        // 주문 정보에 주문 상품 담기
        List<OrderProduct> orderProductList = orderMapper.selectOrderProductByOrderId(orderItem.getId());
        for (OrderProduct orderProduct : orderProductList) {
            List<Integer> optionList = objectMapper.readValue(orderProduct.getOptions(), List.class);
            List<String> optionListString = new ArrayList<>();
            if (optionList != null && !optionList.isEmpty()) {
                for (Integer optionId : optionList) {
                    optionListString.add(productMapper.selectOptionById(optionId));
                }
            }
            orderProduct.setOptionList(optionListString);
        }

        orderItem.setOrderProduct(orderProductList);

        return orderItem;
    }

    public boolean modifyOrderItemState(OrderItem orderItem) {
        if (orderMapper.updateOrderItemState(orderItem.getId(), orderItem.getStateId()) == 1) {
            List<Notice> noticeList = addStateNotice(orderItem);
            messagingTemplate.convertAndSend(STR."/sub/\{orderItem.getCustomerId()}", noticeList);
            return true;
        }
        return false;
    }

    public List<Notice> addStateNotice(OrderItem orderItem) {
        Notice notice = new Notice();
        notice.setCustomerId(orderItem.getCustomerId());
        notice.setTag(orderItem.getId().toString());
        String stateMessage = switch (orderItem.getStateId()) {
            case 1 -> "의 주문을 확인했습니다. 5분 후에 제조가 완료될 예정입니다.";
            case 2 -> "의 제조를 완료했습니다. 1시간 내에 수령해주세요.";
            default -> " 알 수 없는 상태입니다.";
        };
        Integer productCount = orderItem.getOrderProduct().size();
        String countString = productCount > 1 ? " 외 " + (productCount - 1) + "개" : "";
        String content = orderItem.getOrderProduct().get(0).getProductName() + countString + stateMessage;
        notice.setContent(content);
        eventMapper.insertStateNotice(notice);
        return eventMapper.selectAllNoticeByCustomerId(orderItem.getCustomerId());
    }
}
