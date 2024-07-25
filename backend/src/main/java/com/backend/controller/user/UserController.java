package com.backend.controller.user;

import com.backend.domain.user.Branch;
import com.backend.domain.user.Customer;
import com.backend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService service;

    // 메인페이지
    @GetMapping("/")
    public ResponseEntity main(Authentication authentication) {
        return null;
    }

    // 고객 회원가입
    @PostMapping("/user/customer")
    public ResponseEntity<Object> signupCustomer(@RequestBody Customer customer) {
        if (service.validate(customer.getEmail(), customer.getPassword())) {
            service.addCustomer(customer);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    // 지점 회원가입
    @PostMapping("/user/branch")
    public ResponseEntity<Object> signupBranch(@RequestBody Branch branch) throws Exception {
        if (service.validate(branch.getEmail(), branch.getPassword())) {
            Boolean result = service.addBranch(branch);
            if (!result) {
                return ResponseEntity.badRequest().build();
            }
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    // 고객 이메일 중복확인
    @GetMapping("/user/customer/email/{email}")
    public ResponseEntity<Object> getCustomer(@PathVariable String email) {
        Customer customer = service.getCustomerByEmail(email);
        if (customer == null) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatusCode.valueOf(409)).build();
    }

    // 지점 이메일 중복확인
    @GetMapping("/user/branch/email/{email}")
    public ResponseEntity<Object> getBranch(@PathVariable String email) {
        Branch branch = service.getBranchByEmail(email);
        if (branch == null) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatusCode.valueOf(409)).build();
    }

    // 고객 닉네임 중복확인
    @GetMapping("/user/customer/nickName/{nickName}")
    public ResponseEntity<Object> getNameCustomer(@PathVariable String nickName) {
        Customer customer = service.getCustomerByNickName(nickName);
        if (customer == null) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatusCode.valueOf(409)).build();
    }

    // 지점명 중복확인
    @GetMapping("/user/branch/branchName/{branchName}")
    public ResponseEntity<Object> getNameBranch(@PathVariable String branchName) {
        Branch branch = service.getBranchByBranchName(branchName);
        if (branch == null) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatusCode.valueOf(409)).build();
    }

    // 고객 로그인
    @PostMapping("/login/customer")
    public ResponseEntity<Object> tokenCustomer(@RequestBody Customer customer) {
        Map<String, Object> map = service.getToken(customer);
        if (map == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(map);
    }

    // 지점 로그인
    @PostMapping("/login/branch")
    public ResponseEntity<Object> tokenBranch(@RequestBody Branch branch) {
        Map<String, Object> map = service.getTokenBranch(branch);
        if (map == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(map);
    }
}
