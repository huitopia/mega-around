package com.backend.domain.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductFile {
    private Integer productId;
    private String fileName;
    private String filePath;

    public void setFilePath(String tag) {
        this.filePath = STR."\{tag}\{this.productId}/\{fileName}";
    }
}
