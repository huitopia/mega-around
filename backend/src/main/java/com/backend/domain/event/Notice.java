package com.backend.domain.event;

import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
public class Notice {
    Integer id;
    Integer customerId;
    String tag;
    String content;
    LocalDateTime createdAt;

    public String getCreatedAtString() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy. MM. dd. HH:mm");
        return createdAt.format(formatter).toString();
    }
}
