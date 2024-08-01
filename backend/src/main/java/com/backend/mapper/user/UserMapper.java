package com.backend.mapper.user;

import com.backend.domain.user.Branch;
import com.backend.domain.user.Customer;
import org.apache.ibatis.annotations.*;

@Mapper
public interface UserMapper {

    @Insert("""
            INSERT INTO customer(email,password,nick_name) VALUES (#{email},#{password},#{nickName})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insertCustomer(Customer customer);

    @Insert("""
            INSERT INTO branch(email,password,branch_name,address) VALUES (#{email},#{password},#{branchName},#{address})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insertBranch(Branch branch);

    @Select("""
            SELECT * FROM customer WHERE email=#{email}
            """)
    Customer selectCustomerByEmail(String email);

    @Select("""
            SELECT * FROM branch WHERE email=#{email}
            """)
    Branch selectBranchByEmail(String email);

    @Select("""
            SELECT * FROM customer WHERE nick_name=#{nickName}
            """)
    Customer selectCustomerByNickName(String nickName);

    @Select("""
            SELECT * FROM branch WHERE branch_name=#{branchName}
            """)
    Branch selectBranchByBranchName(String branchName);

    @Select("""
            SELECT * FROM customer WHERE id = #{id}
            """)
    Customer selectCustomerById(Integer customerId);

    @Select("""
            SELECT * FROM branch WHERE id = #{id}
            """)
    Branch selectBranchById(Integer branchId);

    @Update("""
            UPDATE customer SET nick_name=#{nickName},password=#{password} WHERE id=#{id}
            """)
    int updateCustomer(Customer customer);

    @Update("""
            UPDATE branch SET branch_name=#{branchName},password=#{password},address=#{address} WHERE id=#{id}
            """)
    int updateBranch(Branch branch);

    @Delete("""
            DELETE FROM customer WHERE id=#{id}
            """)
    int deleteCustomerById(Integer id);

    @Delete("""
            DELETE FROM branch WHERE id=#{id};
            """)
    int deleteBranchById(Integer id);
}
