package com.backend.domain.user;

import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
public class Customer {
    private Integer id;
    private String email;
    private String password;
    private String nickName;
    private String phone;
    private LocalDateTime createdAt;
    private Integer coupon;
    private Integer stamp;

    public String getCreatedAtTime() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return createdAt.format(formatter);
    }
}
