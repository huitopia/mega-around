package com.backend.domain.user;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Branch {
    private Integer id;
    private String email;
    private String password;
    private String branch_name;
    private LocalDateTime created_at;
    private String address;
    private Boolean auth;
}
