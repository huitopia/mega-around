package com.backend.domain.product;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class Product {
    private Integer id;
    private String title;
    private String mainCategory;
    private String subCategory;
    private String content;
    private Integer price;
    private List<Integer> options;
    private LocalDateTime createdAt;
}
