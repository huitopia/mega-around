package com.backend.service.product;

import com.backend.domain.product.Product;
import com.backend.domain.product.ProductFile;
import com.backend.mapper.product.ProductMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class ProductService {
    final private ProductMapper mapper;
    private final ObjectMapper objectMapper;
    final S3Client s3Client;

    @Value("${aws.s3.bucket.name}")
    String bucketName;
    @Value("${image.src.prefix}")
    String imageSrcPrefix;


    public void insertProduct(Product product, MultipartFile file) throws Exception {
        // List<Integer> -> String
        product.setOptions(objectMapper.writeValueAsString(product.getOption()));
        // 상품 저장
        mapper.insertProduct(product);
        System.out.println("product.get(id) = " + product.getId());
        if (file != null) {
            ProductFile productFile = new ProductFile();
            productFile.setProductId(product.getId());
            productFile.setFileName(file.getOriginalFilename());

            // table product_img
            mapper.insertProductImgById(productFile);

            productFile.setFilePath("product");
            System.out.println("productFile.getFilePath() = " + productFile.getFilePath());

            // S3
            PutObjectRequest objectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(productFile.getFilePath())
                    .acl(ObjectCannedACL.PUBLIC_READ)
                    .build();

            s3Client.putObject(objectRequest,
                    RequestBody.fromInputStream(
                            file.getInputStream(), file.getSize()
                    ));
        }
    }
}
