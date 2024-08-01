package com.backend.service.event;

import com.backend.domain.event.Notice;
import com.backend.mapper.event.EventMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Description;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class EventService {
    private final EventMapper eventMapper;

    public Integer getEvent(String item, Integer customerId) {
        if (item.equals("stamp")) {
            return eventMapper.selectStampByCustomerId(customerId);
        } else
            return eventMapper.selectCouponByCustomerId(customerId);
    }

    public Boolean checkItem(String item) {
        return item.equals("stamp") || item.equals("coupon");
    }

    @Description("스탬프/쿠폰 발급 및 알림 추가")
    public void addStamp(Integer customerId, Integer totalCount, Integer couponCount) {

        // 쿠폰 사용
        if (couponCount != 0) {
            eventMapper.insertNotice(customerId, "coupon", "쿠폰을 " + couponCount + "개 사용하였습니다.");
            eventMapper.updateCoupon(customerId, -couponCount);
        }

        // 스탬프 적립
        eventMapper.insertNotice(customerId, "stamp", "스탬프가 " + totalCount + "개 적립되었습니다");
        eventMapper.addStamp(customerId, totalCount);

        // 총 스탬프 수 조회
        Integer stampCount = eventMapper.selectStampByCustomerId(customerId);

        // 쿠폰으로 전환
        if (stampCount > 9) {
            Integer newCouponCount = stampCount / 10;
            Integer restStampCount = stampCount % 10;

            // 쿠폰 적립 & 스탬프 전환
            eventMapper.updateCoupon(customerId, newCouponCount);
            eventMapper.insertNotice(customerId, "coupon", "쿠폰이 " + newCouponCount + "개 적립되었습니다.");
            eventMapper.insertNotice(customerId, "stamp", "스탬프 " + newCouponCount * 10 + "개 가 쿠폰으로 전환되었습니다.");
            // 스탬프 갯수 변경
            if (restStampCount > 0) {
                eventMapper.updateStamp(customerId, restStampCount);
            } else {
                eventMapper.updateStamp(customerId, 0);
            }
        }
    }

    public List<Notice> getNotice(String item, Integer customerId) {
        return eventMapper.selectNoticeByCustomerId(customerId, item);
    }

    public List<Notice> getAlarm(Integer customerId) {
        return eventMapper.selectAllNoticeByCustomerId(customerId);
    }

    public void modifyNotice(Integer customerId) {
        eventMapper.updateNotice(customerId);
    }
}
