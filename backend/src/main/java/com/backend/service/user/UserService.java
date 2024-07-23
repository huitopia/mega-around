package com.backend.service.user;

import com.backend.domain.user.Branch;
import com.backend.domain.user.Customer;
import com.backend.mapper.user.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class UserService {
    private final UserMapper userMapper;
    //    private final PasswordEncoder passwordEncoder;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtEncoder jwtEncoder;

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

    public Customer getCustomerByEmail(String email) {
        return userMapper.selectCustomerByEmail(email);
    }

    public Branch getBranchByEmail(String email) {
        return userMapper.selectBranchByEmail(email);
    }


    public Map<String, Object> getToken(Customer customer) {
        Map<String, Object> result = new HashMap<>();

        Customer db = userMapper.selectCustomerByEmail(customer.getEmail());
        if (db != null) {
            if (passwordEncoder.matches(customer.getPassword(), db.getPassword())) {
                // 토큰 생성
                JwtClaimsSet claims = JwtClaimsSet.builder()
                        .issuer("self")
                        .issuedAt(Instant.now())
                        .expiresAt(Instant.now().plusSeconds(60 * 60 * 24 * 7))
                        .subject(customer.getEmail()) // 사용자를 나타내는 정보
                        .claim("scope", "") // 권한
                        .claim("nickName", db.getNickName())
                        .build();
                String token = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
                result.put("token", token);
            }
        }
        return result;
    }

    public Map<String, Object> getTokenBranch(Branch branch) {
        Map<String, Object> result = new HashMap<>();

        Branch dbBranch = userMapper.selectBranchByEmail(branch.getEmail());
        if (dbBranch != null) {
            if (passwordEncoder.matches(branch.getPassword(), dbBranch.getPassword())) {
                // 토큰 생성
                JwtClaimsSet claims = JwtClaimsSet.builder()
                        .issuer("self")
                        .issuedAt(Instant.now())
                        .expiresAt(Instant.now().plusSeconds(60 * 60 * 24 * 7))
                        .subject(branch.getEmail()) // 사용자를 나타내는 정보
                        .claim("scope", "") // 권한
                        .claim("branchName", dbBranch.getBranchName())
                        .claim("address", dbBranch.getAddress())
                        .claim("subAddress", dbBranch.getSubAddress())
                        .build();
                String token = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
                result.put("token", token);
            }
        }
        return result;
    }
}
