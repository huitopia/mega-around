package com.backend.controller.event;

import com.backend.domain.event.Notice;
import com.backend.service.event.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Description;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    @Description("알림 조회")
    public ResponseEntity getNotice(@PathVariable String item, Authentication authentication) {
        List<Notice> noticeList = eventService.getNotice(item, Integer.valueOf(authentication.getName()));
        return ResponseEntity.ok(noticeList);
    }
}
