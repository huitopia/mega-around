package com.backend.controller.product;

import com.backend.domain.product.Product;
import com.backend.service.product.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Description;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService service;

    @PostMapping
    @Description("상품 업로드")
    // TODO : admin 권한만 등록 가능하게
    public void createProduct(@RequestBody Product product,
                              @RequestParam(value = "file", required = false) MultipartFile file)
            throws Exception {
        // TODO : validate method 생성
        service.insertProduct(product, file);
    }
}
