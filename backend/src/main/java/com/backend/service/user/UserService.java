package com.backend.service.user;

import com.backend.domain.user.Branch;
import com.backend.domain.user.Customer;
import com.backend.mapper.event.EventMapper;
import com.backend.mapper.user.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
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
    private final EventMapper eventMapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtEncoder jwtEncoder;

    public boolean validate(String email, String password, String nickName) {
        if (email == null || email.isBlank()) {
            return false;
        }
        if (password == null || password.isBlank()) {
            return false;
        }
        if (nickName == null || nickName.isBlank()) {
            return false;
        }
        String emailPattern = "[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*";
        if (!email.matches(emailPattern)) {
            return false;
        }
        return true;
    }

    public boolean validateAddress(String address) {
        if (address == null || address.isBlank()) {
            return false;
        }
        return true;
    }

    public void addCustomer(Customer customer) {
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        userMapper.insertCustomer(customer);
        eventMapper.insertCoupon(customer.getId());
        eventMapper.insertStamp(customer.getId());
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

    public Customer getCustomerByNickName(String nickName) {
        return userMapper.selectCustomerByNickName(nickName);
    }

    public Branch getBranchByBranchName(String branchName) {
        return userMapper.selectBranchByBranchName(branchName);
    }

    public Map<String, Object> getToken(Customer customer) {
        Map<String, Object> result = new HashMap<>();
        // 로그인 시도 한 email의 db 가져오기
        Customer db = userMapper.selectCustomerByEmail(customer.getEmail());
        if (db != null) {
            if (passwordEncoder.matches(customer.getPassword(), db.getPassword())) {
                // 토큰 생성
                JwtClaimsSet claims = JwtClaimsSet.builder()
                        .issuer("self")
                        .issuedAt(Instant.now())
                        .expiresAt(Instant.now().plusSeconds(60 * 60 * 24 * 7))
                        .subject(db.getId().toString()) // 사용자를 나타내는 정보
                        .claim("scope", "customer") // 권한
                        .claim("nickName", db.getNickName())
                        .claim("email", db.getEmail())
                        .build();
                String token = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
                result.put("token", token);
            }
        }
        return result;
    }

    public Map<String, Object> getTokenBranch(Branch branch) {
        Map<String, Object> result = new HashMap<>();
        // 로그인 시도 한 email의 db 가져오기
        Branch dbBranch = userMapper.selectBranchByEmail(branch.getEmail());

        // email이 있으면
        if (dbBranch != null) {
            // 비밀번호가 맞으면
            if (passwordEncoder.matches(branch.getPassword(), dbBranch.getPassword())) {
                // Auth가 true이면 admin, false이면 branch
                String authorityString = Boolean.TRUE.equals(dbBranch.getAuth()) ? "admin" : "branch";
                // 토큰 생성
                JwtClaimsSet claims = JwtClaimsSet.builder()
                        .issuer("self")
                        .issuedAt(Instant.now())
                        .expiresAt(Instant.now().plusSeconds(60 * 60 * 24 * 7))
                        .subject(dbBranch.getId().toString()) // 사용자를 나타내는 정보
                        .claim("scope", authorityString) // 권한
                        .claim("email", dbBranch.getEmail())
                        .claim("branchName", dbBranch.getBranchName())
                        .claim("address", dbBranch.getAddress())
                        .build();
                String token = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
                // 이메일과 비밀번호 일치
                result.put("token", token);
            } else {
                // 이메일은 있지만 비밀번호 불일치
                result.put("UNAUTHORIZED", "비밀번호가 맞지 않습니다.");
            }
        }
        // 회원가입이 되어있지 않을 때
        return result;
    }

    public Customer getCustomerById(String customerId) {
        return userMapper.selectCustomerById(customerId);
    }


    public boolean hasAccess(String customerId, Authentication authentication) {
        // customerId, authentication이 null 값이거나 front에서 넘어 온 id가 jwt토큰의 id와 같지 않으면 false 리턴
        if (customerId == null || authentication == null || !customerId.equals(authentication.getName())) {
            return false;
        }
        return true;
    }
}
