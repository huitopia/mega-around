package com.backend.domain.user;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Customer {
    private Integer id;
    private String email;
    private String password;
    private String nickName;
    private String phone;
    private LocalDateTime createdAt;
}
