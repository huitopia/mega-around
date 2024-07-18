package com.backend.controller.product;

import com.backend.domain.product.Product;
import com.backend.service.product.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Description;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService service;


    @PostMapping("/add")
    @Description("상품 업로드")
    // TODO : admin 권한만 등록 가능하게
    public void createProduct(
            Product product,
            @RequestParam(value = "files[]", required = false) MultipartFile[] files)
            throws Exception {
        // TODO : validate method 생성
        service.insertProduct(product, files);
    }
}
