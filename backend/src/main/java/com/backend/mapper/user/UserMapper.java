package com.backend.mapper.user;

import com.backend.domain.user.Branch;
import com.backend.domain.user.Customer;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

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

    @Select("""
            SELECT p.id, i.file_path, p.title, p.content
            FROM product p
                LEFT JOIN product_img i ON p.id = i.product_id
            ORDER BY RAND() LIMIT 12;
            """)
    List<Map<String, Object>> selectRecommendList();

    @Update("""
            UPDATE customer SET password=#{password} WHERE email=#{email}
            """)
    int updatePasswordCustomer(Customer customer);

    @Update("""
            UPDATE branch SET password=#{password} WHERE email=#{email}
            """)
    int updatePasswordBranch(Branch branch);

    @Select("""
            SELECT COALESCE(COUNT(*), 0)
            FROM notice
            WHERE customer_id = #{id}
              AND tag = 'stamp'
              AND created_at > NOW() - INTERVAL 1 HOUR
            GROUP BY tag
            """)
    Integer updatedStamp(Integer id);

    @Select("""
            SELECT COALESCE(COUNT(*), 0)
            FROM notice
            WHERE customer_id = #{id}
              AND tag = 'coupon'
              AND created_at > NOW() - INTERVAL 1 HOUR
            GROUP BY tag
            """)
    Integer updatedCoupon(Integer id);

    @Select("""
            <script>
            SELECT id, email, nick_name, created_at
            FROM customer
                <bind name="pattern" value="'%' + keyword + '%'" />
            WHERE
                (email LIKE #{pattern} OR nick_name LIKE #{pattern})
            ORDER BY id DESC
            LIMIT #{offset}, 10
            </script>
            """)
    List<Customer> selectCustomerList(int offset, String keyword);

    @Select("""
            <script>
            SELECT COUNT(*) FROM customer
            <bind name="pattern" value="'%' + keyword + '%'" />
            WHERE
            (email LIKE #{pattern} OR nick_name LIKE #{pattern})
            ORDER BY id DESC
            </script>
            """)
    int selectTotalUserCount(String keyword);

    @Select("""
                <script>
                SELECT id, email, branch_name, created_at, address
                FROM branch
                    <bind name="pattern" value="'%' + keyword + '%'" />
                WHERE
                    (email LIKE #{pattern} OR branch_name LIKE #{pattern})
                ORDER BY id DESC
                LIMIT #{offset}, 10
                </script>
            """)
    List<Branch> selectBranchList(int offset, String keyword);

    @Select("""
            <script>
            SELECT COUNT(*) FROM branch
            <bind name="pattern" value="'%' + keyword + '%'" />
            WHERE
            (email LIKE #{pattern} OR branch_name LIKE #{pattern})
            ORDER BY id DESC
            </script>
            """)
    int selectTotalBranchCount(String keyword);

    @Delete("""
            DELETE FROM branch_geocode WHERE branch_id=#{id}
            """)
    void deleteBranchByGeocode(Integer id);

//    @Delete("""
//            DELETE cp FROM cart_product cp JOIN cart c ON cp.cart_id = c.id WHERE c.id = #{id};
//            """)
//    void deleteCartProduct(Integer id);

    @Delete("""
            DELETE FROM cart WHERE customer_id=#{id}
            """)
    void deleteCart(Integer id);


}
