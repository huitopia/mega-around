package com.backend.controller.user;

import com.backend.domain.user.Branch;
import com.backend.domain.user.Customer;
import com.backend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService service;

    // 메인페이지
    @GetMapping("/")
    public ResponseEntity main() {
        return null;
    }

    @PostMapping("/user/customer")
    public ResponseEntity<Object> signupCustomer(@RequestBody Customer customer) {
        if (service.validate(customer.getEmail(), customer.getPassword())) {
            service.addCustomer(customer);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/user/branch")
    public ResponseEntity<Object> signupBranch(@RequestBody Branch branch) {
        if (service.validate(branch.getEmail(), branch.getPassword())) {
            service.addBranch(branch);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/user/customer")
    public ResponseEntity<Object> getCustomer(@RequestParam String email) {
        Customer customer = service.getCustomerByEmail(email);
        if (customer == null) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatusCode.valueOf(409)).build();
    }

    @GetMapping("/user/branch")
    public ResponseEntity<Object> getBranch(@RequestParam String email) {
        Customer customer = service.getBranchByEmail(email);
        if (customer == null) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatusCode.valueOf(409)).build();
    }

    @PostMapping("/login/customer")
    public ResponseEntity<Object> token(@RequestBody Customer customer) {
        Map<String, Object> map = service.getToken(customer);
        if (map == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(map);
    }
}
