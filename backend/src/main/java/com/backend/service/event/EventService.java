package com.backend.service.event;

import com.backend.mapper.event.EventMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class EventService {
    private final EventMapper eventMapper;

    public Integer getEvent(String item, Integer customerId) {
        if(item.equals("stamp")){
            return eventMapper.selectStampByCustomerId(customerId);
        } else
            return eventMapper.selectCouponByCustomerId(customerId);
    }

    public Boolean checkItem(String item) {
        return item.equals("stamp") || item.equals("coupon");
    }
}
