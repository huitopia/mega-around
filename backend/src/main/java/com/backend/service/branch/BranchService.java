package com.backend.service.branch;

import com.backend.domain.user.BranchGeocode;
import com.backend.mapper.user.BranchMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class BranchService {
    private final BranchMapper mapper;

    public List<BranchGeocode> selectAroundBranchList(double lat, double lng) {
        List<BranchGeocode> branchGeocodes = mapper.selectAroundBranchList(lat, lng);
        branchGeocodes.forEach(branch -> {
            branch.setBranchName(mapper.selectBranchNameById(branch.getBranchId()));
        });
        return branchGeocodes;
    }
}
