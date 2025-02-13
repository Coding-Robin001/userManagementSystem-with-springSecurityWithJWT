package com.codingRobin.userManagementSystem.config;

import java.security.SecureRandom;
import java.util.Base64;

public class GenerateSecretKey {
    public static void main(String[] args) {
        byte[] secret = new byte[64];
        new SecureRandom().nextBytes(secret);
        String encodedSecret = Base64.getEncoder().encodeToString(secret);
        System.out.println("New JWT Secret: " + encodedSecret);
    }
}
