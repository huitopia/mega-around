package com.backend.domain.product;

import lombok.Data;

@Data
public class OptionItem {
    private Integer id;
    private String content;
    private Integer optionId;
    private Integer price;
}
