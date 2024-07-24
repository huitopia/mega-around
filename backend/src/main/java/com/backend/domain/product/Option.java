package com.backend.domain.product;

import lombok.Data;

import java.util.List;

@Data
public class Option {
    private Integer id;
    private String title;
    private List<OptionItem> option_item;
}
