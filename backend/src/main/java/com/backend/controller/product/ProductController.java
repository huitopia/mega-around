package com.backend.controller.product;

import com.backend.domain.product.Product;
import com.backend.domain.product.ProductFile;
import com.backend.service.product.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Description;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService service;


    @PostMapping("/add")
    @Description("상품 업로드")
    // TODO : admin 권한 확인
    public void createProduct(
            Product product,
            @RequestParam(value = "files[]", required = false) MultipartFile[] files)
            throws Exception {
        service.insertProduct(product, files);
    }

    @GetMapping("/list")
    @Description("카테고리별 상품 리스트")
    // TODO : admin 권한 확인
    public ResponseEntity getProductListByCategory(
            @RequestParam(value = "main", required = false) String mainCategory,
            @RequestParam(value = "sub", required = false) String subCategory) {
        List<Map<String, Object>> result = service.selectProductListByCategory(mainCategory, subCategory);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("{id}")
    @Description("상품 디테일 조회")
    public ResponseEntity getProductDetail(@PathVariable Integer id) throws IOException {
        Map<String, Object> result = service.selectProductDetailById(id);
        return ResponseEntity.ok().body(result);
    }

    @PutMapping("{id}")
    @Description("상품 수정")
    // TODO : admin 권한 확인
    public ResponseEntity updateProduct(
            @PathVariable Integer id,
            Product product,
            @RequestParam("filePath") String filePath,
            @RequestParam(value = "files[]", required = false) MultipartFile[] files) throws Exception {
        // 상품 수정
        Boolean updateProduct = service.updateProductById(product);
        if (updateProduct && files != null) {
            // 기존 이미지 삭제
            Boolean deleteProductImg = service.deleteProductImgById(id, filePath);
            if (!deleteProductImg) {
                return ResponseEntity.badRequest().build();
            }
            // 새 이미지 생성
            Boolean insertProductImg = service.insertProductImgById(id, files);
            if (!insertProductImg) {
                return ResponseEntity.badRequest().build();
            }
        }
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("{id}")
    @Description("상품 삭제")
    // TODO : admin 권한 확인
    public ResponseEntity deleteProductDetail(@PathVariable Integer id) throws IOException {
        ProductFile deleteProduct = service.deleteProductById(id);
        if (deleteProduct.getFilePath() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        Boolean deleteProductImg = service.deleteProductImgById(deleteProduct.getProductId(), deleteProduct.getFilePath());
        if (!deleteProductImg) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
