package com.codingRobin.userManagementSystem.service;

import io.jsonwebtoken.Jwts;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;


@Component
public class JwtUtils {

    private SecretKey key;
    private static final long EXP_TIME = 8640000L;

    public JwtUtils(){
        String secretString = "86342637WIESMPLAJH9ZMXLOWTQANMDKAK20SHD352526HHHS737372973NSGAT";
        byte[] keyBytes = Base64.getDecoder().decode(secretString.getBytes(StandardCharsets.UTF_8));
        this.key = new SecretKeySpec(keyBytes, "HmacSHA256");
    }

    public String generateToken(UserDetails userDetails){
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + EXP_TIME))
                .signWith(key)
                .compact();
    }
}

