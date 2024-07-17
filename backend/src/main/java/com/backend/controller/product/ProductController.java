package com.backend.controller.product;

import com.backend.domain.product.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Description;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {

    @PostMapping
    @Description("상품 업로드")
    // TODO : admin 권한만 등록 가능하게
    public void createProduct(@RequestBody Product product) {
        // Product(id=1, title=null, mainCategory=null, subCategory=null, content=null, price=null, options=null, createdAt=null)
        System.out.println("product = " + product);
    }
}
