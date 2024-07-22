package com.backend.service.user;

import com.backend.domain.user.Branch;
import com.backend.domain.user.Customer;
import com.backend.mapper.user.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class UserService {
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public boolean validate(String email, String password) {
        if (email == null || email.isBlank()) {
            return false;
        }
        if (password == null || password.isBlank()) {
            return false;
        }
        String emailPattern = "[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*";
        if (!email.matches(emailPattern)) {
            return false;
        }
        return true;
    }

    public void addCustomer(Customer customer) {
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        userMapper.insertCustomer(customer);
    }

    public void addBranch(Branch branch) {
        branch.setPassword(passwordEncoder.encode(branch.getPassword()));
        userMapper.insertBranch(branch);
    }

    public Customer getCustomerEmail(String email) {
        return userMapper.getCustomerEmail(email);
    }

    public Customer getBranchEmail(String email) {
        return userMapper.getBranchEmail(email);
    }
}
