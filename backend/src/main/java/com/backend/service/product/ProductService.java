package com.backend.service.product;

import com.backend.domain.product.Option;
import com.backend.domain.product.OptionItem;
import com.backend.domain.product.Product;
import com.backend.domain.product.ProductFile;
import com.backend.mapper.product.OptionMapper;
import com.backend.mapper.product.ProductMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class ProductService {
    final private ProductMapper mapper;
    final private OptionMapper optionMapper;
    private final ObjectMapper objectMapper;
    final S3Client s3Client;

    @Value("${aws.s3.bucket.name}")
    String bucketName;
    @Value("${image.src.prefix}")
    String imageSrcPrefix;


    public void insertProduct(Product product, MultipartFile[] files) throws Exception {
        // List<Integer> -> String
        product.setOptions(objectMapper.writeValueAsString(product.getOption()));
        // 상품 저장
        mapper.insertProduct(product);

        if (files != null && product.getId() != null) {
            ProductFile productFile = new ProductFile();
            productFile.setProductId(product.getId());
            productFile.setFileName(files[0].getOriginalFilename());
            productFile.setFilePath("product");

            // table product_img
            mapper.insertProductImgById(productFile);

            // S3
            PutObjectRequest objectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(productFile.getFilePath())
                    .acl(ObjectCannedACL.PUBLIC_READ)
                    .build();

            s3Client.putObject(objectRequest,
                    RequestBody.fromInputStream(
                            files[0].getInputStream(), files[0].getSize()
                    ));
        }
    }


    public List<Map<String, Object>> selectProductListByCategory(String mainCategory, String subCategory) {
        List<Map<String, Object>> result = mapper.selectProductListByCategory(mainCategory, subCategory);
        return result;
    }

    public Map<String, Object> selectProductDetailById(Integer id) throws IOException {
        Map<String, Object> product = mapper.selectProductDetailById(id);
        String optionId = (String) product.get("options");
        // JSON 문자열 배열로 변환
        List<Integer> optionIdList = (objectMapper.readValue(optionId, List.class));

        List<Option> optionList = new ArrayList<>();
        for (Integer i : optionIdList) {
            Option option = optionMapper.selectOptionById(i);
            List<OptionItem> optionItem = optionMapper.selectOptionItemById(option.getId());
            option.setOption_item(optionItem);
            optionList.add(option);
        }

        product.put("options", optionList);
        return product;
    }


    public Boolean updateProductById(Product product) throws Exception {
        // List<Integer> -> String
        product.setOptions(objectMapper.writeValueAsString(product.getOption()));
        // 상품 수정
        int productResult = mapper.updateProductById(product);
        return productResult >= 1;
    }

    public Boolean insertProductImgById(Integer id, MultipartFile[] files) throws Exception {
        ProductFile productFile = new ProductFile();
        productFile.setProductId(id);
        productFile.setFileName(files[0].getOriginalFilename());
        productFile.setFilePath("product");

        // DB 저장
        int productImgResult = mapper.insertProductImgById(productFile);
        if (productImgResult < 1) {
            return false;
        }

        // S3 저장
        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(productFile.getFilePath())
                .acl(ObjectCannedACL.PUBLIC_READ)
                .build();

        s3Client.putObject(objectRequest,
                RequestBody.fromInputStream(
                        files[0].getInputStream(), files[0].getSize()
                ));

        return true;
    }

    public Boolean deleteProductImgById(Integer id, String filePath) {
        // DB 삭제
        int deleteProductImg = mapper.deleteProductImgById(id);
        if (deleteProductImg < 1) {
            return false;
        }
        // S3 삭제
        DeleteObjectRequest objectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(filePath).build();
        s3Client.deleteObject(objectRequest);

        return true;
    }

    public ProductFile deleteProductById(Integer id) {
        int deleteProduct = mapper.deleteProductById(id);
        if (deleteProduct < 1) {
            return null;
        }
        return mapper.selectProductImgById(id);
    }
}
