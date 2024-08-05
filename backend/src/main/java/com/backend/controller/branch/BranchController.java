package com.backend.controller.branch;

import com.backend.domain.user.BranchGeocode;
import com.backend.service.branch.BranchService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Description;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class BranchController {
    private final BranchService service;

    @GetMapping("/location")
    @Description("가까운 지점 조회")
    public ResponseEntity getUserAroundBranch(@RequestParam double lat, @RequestParam double lng) {
        List<BranchGeocode> branchGeocodes = service.selectAroundBranchList(lat, lng);
        if (branchGeocodes.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(branchGeocodes);
    }
}
