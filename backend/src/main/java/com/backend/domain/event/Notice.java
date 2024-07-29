package com.backend.domain.event;

import java.time.LocalDateTime;

public class Notice {
    Integer id;
    Integer customerId;
    String tag;
    String content;
    LocalDateTime createdAt;
}
