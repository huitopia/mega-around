package com.backend.domain.user;

import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
public class Branch {
    private Integer id;
    private String email;
    private String password;
    private String branchName;
    private LocalDateTime createdAt;
    private String address;
    private Boolean auth;

    public String getCreatedAtTime() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return createdAt.format(formatter);
    }

    public String getCreatedAtAll() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return createdAt.format(formatter);
    }

}
