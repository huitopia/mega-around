package com.backend.service.user;

import com.backend.domain.user.Branch;
import com.backend.domain.user.BranchGeocode;
import com.backend.domain.user.Customer;
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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class UserService {

    @Value("${kakao.api.key}")
    String kakaoRestAPIKey;

    private final UserMapper userMapper;
    //    private final PasswordEncoder passwordEncoder;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtEncoder jwtEncoder;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final BranchMapper branchMapper;

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

        Branch dbBranch = userMapper.selectBranchByEmail(branch.getEmail());
        if (dbBranch != null) {
            if (passwordEncoder.matches(branch.getPassword(), dbBranch.getPassword())) {

                List<String> authority = userMapper.selectAuthorityByBranchAuth(dbBranch.getAuth());

                if (authority != null) {

                }

//                String auth = authority.stream().collect(Collectors.joining(" ")); //리스트의 모든 요소로 공백으로 구분하여 하나의 문자열로 결합

                // 토큰 생성
                JwtClaimsSet claims = JwtClaimsSet.builder()
                        .issuer("self")
                        .issuedAt(Instant.now())
                        .expiresAt(Instant.now().plusSeconds(60 * 60 * 24 * 7))
                        .subject(dbBranch.getId().toString()) // 사용자를 나타내는 정보
                        .claim("scope", "") // 권한
                        .claim("email", dbBranch.getEmail())
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
