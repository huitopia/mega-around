package com.backend.mapper.product;

import com.backend.domain.product.Product;
import com.backend.domain.product.ProductFile;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

@Mapper
public interface ProductMapper {
    @Insert("""
            INSERT INTO product (title, content, main_category, sub_category, price, options)
            VALUES (#{title}, #{content}, #{mainCategory}, #{subCategory}, #{price}, #{options})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insertProduct(Product product);

    @Insert("""
            INSERT INTO product_img (product_id, file_name, file_path)
            VALUES (#{productId}, #{fileName}, #{filePath})
            """)
    int insertProductImgById(ProductFile productFile);

    @Select("""
            SELECT p.id, i.file_path, p.price, p.title, p.main_category, p.sub_category
            FROM product p
                LEFT JOIN product_img i ON p.id = i.product_id
            WHERE p.main_category = #{mainCategory}
                AND p.sub_category = #{subCategory}
            """)
    List<Map<String, Object>> selectProductListByCategory(String mainCategory, String subCategory);
}
