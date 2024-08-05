package com.backend.controller.user;

import com.backend.domain.user.Branch;
import com.backend.domain.user.Customer;
import com.backend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Description;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService service;

    @GetMapping("/")
    @Description("메인페이지")
    public List<Map<String, Object>> list() {
        return service.getList();
    }

    @PostMapping("/user/customer")
    @Description("고객 회원가입")
    public ResponseEntity<Object> signupCustomer(@RequestBody Customer customer) {
        if (service.validate(customer.getEmail(), customer.getPassword(), customer.getNickName())) {
            service.addCustomer(customer);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/user/branch")
    @Description("지점 회원가입")
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

    @GetMapping("/user/customer/email/{email}")
    @Description("고객 이메일 중복확인")
    public ResponseEntity<Object> getCustomer(@PathVariable String email) {
        Customer customer = service.getCustomerByEmail(email);
        if (customer == null) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatusCode.valueOf(409)).build();
    }

    @GetMapping("/user/branch/email/{email}")
    @Description("지점 이메일 중복확인")
    public ResponseEntity<Object> getBranch(@PathVariable String email) {
        Branch branch = service.getBranchByEmail(email);
        if (branch == null) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatusCode.valueOf(409)).build();
    }

    @GetMapping("/user/customer/nickName/{nickName}")
    @Description("고객 닉네임 중복확인")
    public ResponseEntity<Object> getNameCustomer(@PathVariable String nickName) {
        Customer customer = service.getCustomerByNickName(nickName);
        if (customer == null) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatusCode.valueOf(409)).build();
    }

    @GetMapping("/user/branch/branchName/{branchName}")
    @Description("지점명 중복확인")
    public ResponseEntity<Object> getNameBranch(@PathVariable String branchName) {
        Branch branch = service.getBranchByBranchName(branchName);
        if (branch == null) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatusCode.valueOf(409)).build();
    }

    @PostMapping("/login/customer")
    @Description("고객 로그인")
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

    @PostMapping("/login/branch")
    @Description("지점 로그인")
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

    @GetMapping("/user/customer/{id}")
    @PreAuthorize("hasAuthority('SCOPE_customer')")
    @Description("고객 정보 읽기")
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

    @GetMapping("/user/branch/{id}")
    @PreAuthorize("hasAuthority('SCOPE_branch')")
    @Description("지점 정보 읽기")
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

    @PostMapping("/user/customer/password/{id}")
    @PreAuthorize("isAuthenticated()")
    @Description("고객 비밀번호 확인")
    public ResponseEntity<Object> getCustomerPasswordById(@PathVariable Integer id, @RequestBody Map<String, String> requestBody, Authentication authentication) {
        if (!service.hasAccess(id, authentication)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        if (service.identifyCustomer(id, requestBody.get("password"))) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/user/branch/password/{id}")
    @PreAuthorize("isAuthenticated()")
    @Description("지점 비밀번호 확인")
    public ResponseEntity<Object> getBranchPasswordById(@PathVariable Integer id, @RequestBody Map<String, String> requestBody, Authentication authentication) {
        if (!service.hasAccess(id, authentication)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        if (service.identifyBranch(id, requestBody.get("password"))) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PutMapping("/user/customer/{id}")
    @PreAuthorize("hasAuthority('SCOPE_customer')")
    @Description("고객 정보 수정")
    public ResponseEntity<Object> updateCustomer(@RequestBody Customer customer, Authentication authentication) {
        if (service.isNameEmpty(customer.getNickName())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("닉네임을 입력해 주세요");
        }
        if (!service.isPasswordValid(customer.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("유효한 비밀번호를 입력해 주세요");
        }
        Map<String, Object> token = service.updateCustomer(customer, authentication);
        return ResponseEntity.ok(token);
    }

    @PutMapping("/user/branch/{id}")
    @PreAuthorize("hasAuthority('SCOPE_branch')")
    @Description("지점 정보 수정")
    public ResponseEntity<Object> updateBranch(@RequestBody Branch branch, Authentication authentication) {
        if (service.isNameEmpty(branch.getBranchName())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("닉네임을 입력해 주세요");
        }
        if (!service.isPasswordValid(branch.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("유효한 비밀번호를 입력해 주세요");
        }
        Map<String, Object> token = service.updateBranch(branch, authentication);
        return ResponseEntity.ok(token);
    }

    @DeleteMapping("/user/customer/{id}")
    @PreAuthorize("hasAuthority('SCOPE_customer')")
    @Description("고객 회원 탈퇴")
    public ResponseEntity<Object> deleteCustomer(@PathVariable Integer id, Authentication authentication) {
        if (service.hasAccess(id, authentication)) {
            service.deleteCustomer(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @DeleteMapping("/user/branch/{id}")
    @PreAuthorize("hasAuthority('SCOPE_branch')")
    @Description("지점 회원 탈퇴")
    public ResponseEntity<Object> deleteBranch(@PathVariable Integer id, Authentication authentication) {
        if (service.hasAccess(id, authentication)) {
            service.deleteBranch(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @PutMapping("/user/customer/password")
    @Description("고객 비밀번호 재설정")
    public ResponseEntity modifyPasswordCustomer(@RequestBody Customer customer) {
        if (!service.checkPasswordPattern(customer.getPassword())) {
            return ResponseEntity.badRequest().build();
        }
        if (service.modifyPasswordCustomer(customer)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/user/branch/password")
    @Description("지점 비밀번호 재설정")
    public ResponseEntity modifyPasswordBranch(@RequestBody Branch branch) {
        if (!service.checkPasswordPattern(branch.getPassword())) {
            return ResponseEntity.badRequest().build();
        }
        if (service.modifyPasswordBranch(branch)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/user/customer/email")
    @Description("고객 이메일 찾기")
    public ResponseEntity findCustomerEmail(@RequestBody Customer customer) {
        // 등록되지 않은 닉네임인지 확인
        if (!service.isNameRegistered(customer.getNickName())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("등록되지 않은 닉네임입니다");
        }
        // 등록되었으면 비밀번호가 일치하는지
        if (!service.isPasswordMatch(customer)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("패스워드가 일치하지 않습니다");
        }
        Customer result = service.getCustomerByNickName(customer.getNickName());
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/user/branch/email")
    @Description("지점 이메일 찾기")
    public ResponseEntity findBranchEmail(@RequestBody Branch branch) {
        // 등록되지 않은 닉네임인지 확인
        if (!service.isNameRegisteredBranch(branch.getBranchName())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("등록되지 않은 닉네임입니다");
        }
        // 등록되었으면 비밀번호가 일치하는지
        if (!service.isPasswordMatchBranch(branch)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("패스워드가 일치하지 않습니다");
        }
        Branch result = service.getBranchByBranchName(branch.getBranchName());
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/notice/updated/{id}")
    @Description("스탬프, 쿠폰 업데이트 되면 메인페이지에서 화면에 표시")
    public ResponseEntity getUpdatedStampCoupon(@PathVariable Integer id) {
        Map<String, Boolean> map = service.updated(id);
        if (!map.isEmpty()) {
            return ResponseEntity.ok().body(map);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/user/admin/customer/list")
    @PreAuthorize("hasAuthority('SCOPE_admin')")
    @Description("관리자 - 고객 리스트 조회")
    public Map<String, Object> customerList(@RequestParam(required = false, defaultValue = "1") int page,
                                            @RequestParam(required = false, defaultValue = "") String keyword) {
        return service.getCustomerList(page, keyword);
    }

    @GetMapping("/user/admin/branch/list")
    @PreAuthorize("hasAuthority('SCOPE_admin')")
    @Description("관리자 - 지점 리스트 조회")
    public Map<String, Object> branchList(@RequestParam(required = false, defaultValue = "1") int page,
                                          @RequestParam(required = false, defaultValue = "") String keyword) {
        return service.getBranchList(page, keyword);
    }

}
