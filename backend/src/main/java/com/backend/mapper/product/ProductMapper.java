package com.backend.mapper.product;

import com.backend.domain.product.Product;
import com.backend.domain.product.ProductFile;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;

@Mapper
public interface ProductMapper {
    @Insert("""
            INSERT INTO product (title, content, main_category, sub_category, price, options)
            VALUES (#{title}, #{content}, #{mainCategory}, #{subCategory}, #{price}, #{options})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insertProduct(Product product);

    @Insert("""
            INSERT INTO product_img (product_id, file_name)
            VALUES (#{productId}, #{fileName})
            """)
    int insertProductImgById(ProductFile productFile);
}
