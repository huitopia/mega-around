package com.backend.service.user;

import com.backend.domain.user.Branch;
import com.backend.domain.user.BranchGeocode;
import com.backend.domain.user.Customer;
import com.backend.mapper.event.EventMapper;
import com.backend.mapper.user.BranchMapper;
import com.backend.mapper.user.UserMapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class UserService {

    @Value("${kakao.api.key}")
    String kakaoRestAPIKey;

    private final UserMapper userMapper;
    private final EventMapper eventMapper;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtEncoder jwtEncoder;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final BranchMapper branchMapper;

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
        eventMapper.insertCoupon(customer.getId(), 0);
        eventMapper.insertStamp(customer.getId(), 0);
    }

    public Boolean addBranch(Branch branch) throws Exception {
        branch.setPassword(passwordEncoder.encode(branch.getPassword()));
        userMapper.insertBranch(branch);
        // -- Geocode
        BranchGeocode branchGeocode = getGeocode(branch);
        if (branchGeocode.getLatitude() == 0.0) {
            return false;
        }
        branchGeocode.setBranchId(branch);
        // mapper 저장
        int insertResult = branchMapper.insertGeocodeById(branchGeocode);
        return insertResult >= 1;
    }

    private BranchGeocode getGeocode(Branch branch) throws Exception {
        // 위도, 경도 받기
        String geocode = getKaKaoMapInfo(branch.getAddress());
        if (geocode == null) {
            return null;
        }
        // String -> Json
        return parseGeocode(geocode);
    }

    private String getKaKaoMapInfo(String address) {
        String kakaoMapUrl = "https://dapi.kakao.com/v2/local/search/keyword.json?query=";
        String url = kakaoMapUrl + address;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "KakaoAK " + kakaoRestAPIKey);
        headers.set("Accept", "application/json");
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        return response.getBody();
    }

    private BranchGeocode parseGeocode(String geocode) throws Exception {
        BranchGeocode branchGeocode = new BranchGeocode();
        JsonNode root = objectMapper.readTree(geocode);
        JsonNode location = root.path("documents").get(0);
        if (location == null) {
            return null;
        }
        branchGeocode.setLatitude(location.path("y").asDouble());
        branchGeocode.setLongitude(location.path("x").asDouble());
        return branchGeocode;
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
        // 회원가입이 되어있지 않을 때
        if (db == null) {
            result.put("forbidden", "등록되지 않은 이메일입니다.");
            return result;
        }
        // 이메일이 있고 비밀번호가 일치했을 때
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
            result.put("name", db.getNickName());
        }
        // 이메일은 있지만 비밀번호가 일치하지 않을 때
        result.put("unauthorized", "비밀번호가 일치하지 않습니다. 다시 시도해 주세요.");
        return result;
    }

    public Map<String, Object> getTokenBranch(Branch branch) {
        Map<String, Object> result = new HashMap<>();
        // 로그인 시도 한 이메일에 해당하는 db 가져오기
        Branch dbBranch = userMapper.selectBranchByEmail(branch.getEmail());

        // 회원가입이 되어있지 않을 때
        if (dbBranch == null) {
            result.put("forbidden", "등록되지 않은 이메일입니다.");
            return result;
        }
        // 이메일이 있고 비밀번호가 일치했을 때
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
            result.put("token", token);
            result.put("name", dbBranch.getBranchName());
            return result;
        }
        // 이메일은 있지만 비밀번호가 일치하지 않을 때
        result.put("unauthorized", "비밀번호가 일치하지 않습니다. 다시 시도해 주세요.");
        return result;
    }

    public boolean hasAccess(Integer id, Authentication authentication) {
        // id, authentication이 null 값이거나 front에서 넘어 온 id가 jwt토큰의 id와 같지 않으면 false 리턴
        if (id == null || authentication == null || !id.equals(Integer.valueOf(authentication.getName()))) {
            return false;
        }
        return true;
    }

    public Customer getCustomerById(Integer customerId) {
        return userMapper.selectCustomerById(customerId);
    }

    public Branch getBranchById(Integer branchId) {
        return userMapper.selectBranchById(branchId);
    }

    public boolean identificationToModify(Customer customer) {
        Customer dbcustomer = userMapper.selectCustomerById(customer.getId());
        return passwordEncoder.matches(customer.getOldPassword(), dbcustomer.getPassword());
    }

    public boolean updateVerification(Customer customer) {
        if (!customer.getPassword().isEmpty()) {
            System.out.println("!customer.getPassword().isEmpty()");
            String passwordPattern = "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,20}$";
            return customer.getPassword().trim().matches(passwordPattern);
        }
        if (customer.getNickName().isEmpty()) {
            return false;
        }
        return true;
    }

    public Map<String, Object> updateCustomer(Customer customer, Authentication authentication) {
        if (customer.getPassword() != null && !customer.getPassword().isEmpty()) {
            customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        } // 입력한 비밀번호가 null이거나 비어있으면
        else {
            Customer dbcustomer = userMapper.selectCustomerById(customer.getId());
            customer.setPassword(dbcustomer.getPassword());
        }
        userMapper.updateCustomer(customer);

        String token = "";

        Jwt jwt = (Jwt) authentication.getPrincipal();
        Map<String, Object> claims = jwt.getClaims();
        JwtClaimsSet.Builder jwtClaimsSetBuilder = JwtClaimsSet.builder();
        claims.forEach(jwtClaimsSetBuilder::claim);
        jwtClaimsSetBuilder.claim("nickName", customer.getNickName());

        JwtClaimsSet jwtClaimsSet = jwtClaimsSetBuilder.build();
        token = jwtEncoder.encode(JwtEncoderParameters.from(jwtClaimsSet)).getTokenValue();
        return Map.of("token", token);
    }

    public boolean identifyCustomer(Integer id, String password) {
        Customer db = userMapper.selectCustomerById(id);
        if (password == null || password.isEmpty()) {
            return false;
        }
        System.out.println("db = " + db);
        Boolean value = passwordEncoder.matches(password, db.getPassword());
        System.out.println("value = " + value);
        return passwordEncoder.matches(password, db.getPassword());
    }
}
