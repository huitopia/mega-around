package com.backend.service.branch;

import com.backend.domain.user.BranchGeocode;
import com.backend.mapper.user.BranchMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class BranchService {
    private final BranchMapper mapper;

    public List<BranchGeocode> selectAroundBranchList(double lat, double lng) {
        List<BranchGeocode> branchGeocodes = mapper.selectAroundBranchList(lat, lng);
        branchGeocodes.forEach(branch -> {
            BranchGeocode branchGeocode = mapper.selectBranchInfoById(branch.getBranchId());
            branch.setBranchName(branchGeocode.getBranchName());
            branch.setAddress(branchGeocode.getAddress());
        });
        return getNearestStores(lat, lng, branchGeocodes);
    }

    private List<BranchGeocode> getNearestStores(
            double lat, double lng, List<BranchGeocode> branchGeocodes) {
        return branchGeocodes.stream()
                .map(branch -> {
                    double distance = calculateDistance(lat, lng, branch.getLatitude(), branch.getLongitude());
                    branch.setDistance(distance); // 거리 설정
                    return branch;
                })
                .sorted(Comparator.comparingDouble(BranchGeocode::getDistance))
                .limit(10)
                .collect(Collectors.toList());
    }

    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371;
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c * 1000; // 거리 (m)로 변환
    }

}
