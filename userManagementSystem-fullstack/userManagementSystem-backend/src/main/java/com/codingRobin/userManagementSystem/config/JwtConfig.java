package com.codingRobin.userManagementSystem.config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtConfig {

        @Value("${jwt.secret}")
        private String secret;

        @Value("${jwt.expiration-time}")
        private long expirationTime;

        public String getSecret() {
            return secret;
        }

        public long getExpirationTime() {
            return expirationTime;
        }
}
