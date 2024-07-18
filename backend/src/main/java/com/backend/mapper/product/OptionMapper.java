package com.backend.mapper.product;

import com.backend.domain.product.Option;
import com.backend.domain.product.OptionItem;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface OptionMapper {
    @Select("""
            SELECT * FROM option WHERE id = #{id}
            """)
    Option selectOptionById(Integer id);

    @Select("""
            SELECT * FROM option_item WHERE option_id = #{id}
            """)
    List<OptionItem> selectOptionItemById(Integer id);
}
