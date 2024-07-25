package com.backend.service.map;

import com.backend.domain.user.Branch;
import com.backend.domain.user.BranchMap;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class MapService {

    @Value("${kakao.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public Boolean getGeocode(Branch branch) {
        String geocode = getGeocode(branch.getAddress());
        double[] latLng = parseGeocode(geocode);
        BranchMap branchMap = new BranchMap();
        branchMap.setLatitude(latLng[0]);
        branchMap.setLongitude(latLng[1]);
        // mapper save

        return null;
    }

    public String getGeocode(String address) {
        String uri = UriComponentsBuilder.fromHttpUrl("https://dapi.kakao.com/v2/local/search/address.json")
                .queryParam("query", address)
                .toUriString();

        return restTemplate.getForObject(uri, String.class, getHeaders());
    }

    public double[] parseGeocode(String geocode) {
        double[] latLng = new double[2];
        try {
            JsonNode root = objectMapper.readTree(geocode);
            JsonNode location = root.path("documents").get(0).path("address");
            latLng[0] = location.path("y").asDouble();
            latLng[1] = location.path("x").asDouble();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return latLng;
    }

    public HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "KakaoAK " + apiKey);
        return headers;
    }
}
