package com.backend.mapper.user;

import com.backend.domain.user.BranchGeocode;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BranchMapper {
    @Insert("""
            INSERT INTO branch_geocode (branch_id, latitude, longitude)
            VALUES (#{branchId}, #{latitude}, #{longitude})
            """)
    int insertGeocodeById(BranchGeocode branchGeocode);
}
