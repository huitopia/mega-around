package com.backend.controller.user;

import com.backend.domain.user.Branch;
import com.backend.domain.user.Customer;
import com.backend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
        if (service.validate(customer.getEmail(), customer.getPassword(), customer.getNickName())) {
            service.addCustomer(customer);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    // 지점 회원가입
    @PostMapping("/user/branch")
    public ResponseEntity<Object> signupBranch(@RequestBody Branch branch) throws Exception {
        if (service.validate(branch.getEmail(), branch.getPassword(), branch.getBranchName()) &&
                service.validateAddress(branch.getAddress())) {
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
        if (map.containsKey("token")) {
            return ResponseEntity.ok(map);
        }
        if (map.containsKey("unauthorized")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map.get("unauthorized"));
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(map.get("forbidden"));
    }

    // 지점 로그인
    @PostMapping("/login/branch")
    public ResponseEntity<Object> tokenBranch(@RequestBody Branch branch) {
        Map<String, Object> map = service.getTokenBranch(branch);
        // email,password 모두 맞을 때 (토큰이 생성되었을 때)
        if (map.containsKey("token")) {
            return ResponseEntity.ok(map);
        }
        // email은 있으나 비밀번호가 맞지 않을 때
        if (map.containsKey("unauthorized")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map.get("unauthorized"));
        }
        // DB에 저장된 정보가 없을 때(회원가입이 되어있지 않을 때)
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(map.get("forbidden"));
    }

    // 고객 정보 읽기
    @GetMapping("/user/customer/{id}")
    @PreAuthorize("hasAuthority('SCOPE_customer')")
    public ResponseEntity<Object> getCustomerById(@PathVariable Integer id, Authentication authentication) {
        if (!service.hasAccess(id, authentication)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        Customer customer = service.getCustomerById(id);
        if (customer == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(customer);
    }

    // 지점 정보 읽기
    @GetMapping("/user/branch/{id}")
    @PreAuthorize("hasAuthority('SCOPE_branch')")
    public ResponseEntity<Object> getBranchById(@PathVariable Integer id, Authentication authentication) {
        if (!service.hasAccess(id, authentication)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        Branch branch = service.getBranchById(id);
        if (branch == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(branch);
    }

    // 고객 비밀번호 확인
    @PostMapping("/user/customer/password/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Object> getCustomerPasswordById(@PathVariable Integer id, @RequestBody Map<String, String> requestBody, Authentication authentication) {
        if (!service.hasAccess(id, authentication)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        if (service.identifyCustomer(id, requestBody.get("password"))) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    // 지점 비밀번호 확인
    @PostMapping("/user/branch/password/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Object> getBranchPasswordById(@PathVariable Integer id, @RequestBody Map<String, String> requestBody, Authentication authentication) {
        if (!service.hasAccess(id, authentication)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        if (service.identifyBranch(id, requestBody.get("password"))) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    // 고객 정보 수정
    @PutMapping("/user/customer/{id}")
    @PreAuthorize("hasAuthority('SCOPE_customer')")
    public ResponseEntity<Object> updateCustomer(@RequestBody Customer customer, Authentication authentication) {
        if (service.isNameEmpty(customer.getNickName())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("닉네임을 입력해 주세요");
        }
        if (!service.isPasswordValid(customer.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("유효한 비밀번호를 입력해 주세요");
        }
        Map<String, Object> token = service.updateCustomer(customer, authentication);
        System.out.println("ok() customer = " + customer);
        return ResponseEntity.ok(token);
    }

    // 지점 정보 수정
    @PutMapping("/user/branch/{id}")
    @PreAuthorize("hasAuthority('SCOPE_branch')")
    public ResponseEntity<Object> updateBranch(@RequestBody Branch branch, Authentication authentication) {
        if (service.isNameEmpty(branch.getBranchName())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("닉네임을 입력해 주세요");
        }
        if (!service.isPasswordValid(branch.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("유효한 비밀번호를 입력해 주세요");
        }
        Map<String, Object> token = service.updateBranch(branch, authentication);
        System.out.println("ok() branch = " + branch);
        return ResponseEntity.ok(token);
    }

    // 고객 회원 탈퇴
    @DeleteMapping("/user/customer/{id}")
    @PreAuthorize("hasAuthority('SCOPE_customer')")
    public ResponseEntity<Object> deleteCustomer(@PathVariable Integer id, Authentication authentication) {
        if (service.hasAccess(id, authentication)) {
            service.deleteCustomer(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
}
