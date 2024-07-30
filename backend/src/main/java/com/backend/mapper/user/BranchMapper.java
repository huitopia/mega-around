package com.backend.mapper.user;

import com.backend.domain.user.BranchGeocode;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface BranchMapper {
    @Insert("""
            INSERT INTO branch_geocode (branch_id, latitude, longitude)
            VALUES (#{branchId}, #{latitude}, #{longitude})
            """)
    int insertGeocodeById(BranchGeocode branchGeocode);

    @Select("""
            SELECT branch_id, latitude, longitude,
                (6371 * acos(cos(radians(#{lat})) * cos(radians(latitude)) * cos(radians(longitude) - radians(#{lng}))
                + sin(radians(#{lat})) * sin(radians(latitude)))) AS distance
            FROM branch_geocode
            ORDER BY distance LIMIT 10
            """)
    List<BranchGeocode> selectAroundBranchList(double lat, double lng);

    @Select("""
            SELECT branch_name
            FROM branch WHERE id = #{id}
            """)
    String selectBranchNameById(Integer id);
}
