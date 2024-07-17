package com.backend.controller.user;

import com.backend.domain.user.Branch;
import com.backend.domain.user.Customer;
import com.backend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService service;

    @PostMapping("/user/customer")
    public ResponseEntity<Object> signupCustomer(@RequestBody Customer customer) {
        if (service.validate(customer.getEmail(), customer.getPassword())) {
            service.addCustomer(customer);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/user/branch")
    public void signupBranch(@RequestBody Branch branch) {
        service.validate(branch.getEmail(), branch.getPassword());
    }
}
