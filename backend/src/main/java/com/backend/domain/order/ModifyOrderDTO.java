package com.backend.domain.order;

import lombok.Data;

@Data
public class ModifyOrderDTO {
    private String stateId;
    private Integer customerId;
}
