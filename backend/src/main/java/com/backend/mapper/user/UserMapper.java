package com.backend.mapper.user;

import com.backend.domain.user.Branch;
import com.backend.domain.user.Customer;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

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

    @Select("""
            SELECT * FROM customer WHERE email=#{email}
            """)
    Customer selectCustomerByEmail(String email);

    @Select("""
            SELECT * FROM branch WHERE email=#{email}
            """)
    Branch selectBranchByEmail(String email);
}
