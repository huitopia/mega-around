package com.backend.domain.user;

import lombok.Data;

@Data
public class Map {
    private Integer branchId;
    private Double latitude; // 위도
    private Double longitude; // 경도
}
