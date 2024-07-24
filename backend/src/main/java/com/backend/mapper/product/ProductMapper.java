package com.backend.mapper.product;

import com.backend.domain.product.Product;
import com.backend.domain.product.ProductFile;
import org.apache.ibatis.annotations.*;

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

    @Select("""
            SELECT *
            FROM product p
                LEFT JOIN product_img i ON p.id = i.product_id
            WHERE p.id = #{id}
            """)
    Map<String, Object> selectProductDetailById(Integer id);

    @Select("""
            SELECT content
            FROM option_item
            WHERE id = #{id}
            """)
    String selectOptionById(Integer id);

    @Update("""
            UPDATE product
            SET title=#{title},
                content=#{content},
                main_category=#{mainCategory},
                sub_category=#{subCategory},
                options=#{options},
                price=#{price},
                created_at=NOW()
            WHERE id=#{id}
            """)
    int updateProductById(Product product);

    @Delete("""
            DELETE FROM product_img WHERE product_id = #{id}
            """)
    int deleteProductImgById(Integer id);

    @Delete("""
            DELETE FROM product WHERE id = #{id}
            """)
    int deleteProductById(Integer id);

    @Select("""
            SELECT * FROM product_img WHERE product_id = #{id}
            """)
    ProductFile selectProductImgById(Integer id);
}
