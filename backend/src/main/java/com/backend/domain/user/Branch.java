package com.backend.domain.user;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Branch {
    private Integer id;
    private String email;
    private String password;
    private String branchName;
    private LocalDateTime createdAt;
    private String address;
    private String subAddress;
    private Boolean auth;
}
