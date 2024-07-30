package com.backend.domain.user;

import lombok.Data;

@Data
public class BranchGeocode {
    private Integer branchId;
    private Double latitude; // 위도
    private Double longitude; // 경도
    private String branchName;
    private String address;
}


