package com.backend.mapper.user;

import com.backend.domain.user.Branch;
import com.backend.domain.user.Customer;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    @Insert("""
            INSERT INTO customer(email,password,nick_name) VALUES (#{email},#{password},#{nickName})
            """)
    int insertCustomer(Customer customer);

    @Insert("""
            INSERT INTO branch(email,password,branch_name,address,sub_address) VALUES (#{email},#{password},#{branchName},#{address},#{subAddress})
            """)
    int insertBranch(Branch branch);
}
