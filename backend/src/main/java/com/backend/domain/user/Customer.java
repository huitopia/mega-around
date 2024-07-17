package com.backend.domain.user;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Customer {
    private Integer id;
    private String email;
    private String password;
    private String nick_name;
    private String phone;
    private LocalDateTime created_at;
}
