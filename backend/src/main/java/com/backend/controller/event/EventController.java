package com.backend.controller.event;

import com.backend.domain.event.Notice;
import com.backend.service.event.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Description;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class EventController {
    private final EventService eventService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/event/{item}")
    @Description("스탬프/쿠폰 조회")
    public ResponseEntity getEvent(@PathVariable String item, Authentication authentication) {
        if (eventService.checkItem(item)) {
            Integer count = eventService.getEvent(item, Integer.valueOf(authentication.getName()));
            return ResponseEntity.ok(count);
        }
        return ResponseEntity.badRequest().build();
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/notice/{item}")
    @Description("스탬프/쿠폰 내역 조회")
    public ResponseEntity getNotice(@PathVariable String item, Authentication authentication) {
        List<Notice> noticeList = eventService.getNotice(item, Integer.valueOf(authentication.getName()));
        return ResponseEntity.ok(noticeList);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/event/notice/{customerId}")
    @Description("네브바 알림 조회")
    public ResponseEntity getAlarm(@PathVariable Integer customerId) {
        return ResponseEntity.ok(eventService.getAlarm(customerId));
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/event/notice")
    @Description("알림 읽음으로 변경")
    public void modifyNotice(@RequestBody Notice notice) {
        eventService.modifyNotice(notice.getCustomerId());
    }
}
