package com.backend.domain.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductFile {
    private Integer productId;
    private String fileName;
    private String filePath;

    public void setFilePath(String tag) {
        if (Objects.equals(tag, "product")) {
            this.filePath = STR."\{"mega"}/\{tag}/\{this.productId}/\{fileName}";
        } else {
            this.filePath = tag;
        }
    }
}
