package com.backend.controller.branch;

import com.backend.domain.user.BranchGeocode;
import com.backend.service.branch.BranchService;
import lombok.RequiredArgsConstructor;
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
    public ResponseEntity getUserAroundBranch(@RequestParam double lat, @RequestParam double lng) {
        System.out.println("lat = " + lat);
        System.out.println("lng = " + lng);
        List<BranchGeocode> branchGeocodes = service.selectAroundBranchList(lat, lng);
        System.out.println("branchGeocodes = " + branchGeocodes);
        return ResponseEntity.ok().body(branchGeocodes);

    }
}
