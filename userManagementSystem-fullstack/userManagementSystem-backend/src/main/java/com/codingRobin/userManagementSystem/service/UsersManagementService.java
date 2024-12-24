package com.codingRobin.userManagementSystem.service;

import com.codingRobin.userManagementSystem.dto.ReqRes;
import com.codingRobin.userManagementSystem.entity.OurUsers;
import com.codingRobin.userManagementSystem.repository.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class UsersManagementService {

    @Autowired
    private UsersRepo usersRepo;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public ReqRes register(ReqRes registrationRequest) {
        ReqRes response = new ReqRes();

        try {
            OurUsers ourUser = new OurUsers();
            ourUser.setEmail(registrationRequest.getEmail());
            ourUser.setCity(registrationRequest.getCity());
            ourUser.setRole(registrationRequest.getRole());
            ourUser.setName(registrationRequest.getName());
            ourUser.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            OurUsers savedUser = usersRepo.save(ourUser);

            if (savedUser.getId() > 0) {
                response.setOurUsers(savedUser);
                response.setMessage("User saved successfully!");
            }

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setError(e.getMessage());
            response.setStatusCode(200);
        }
        return response;
    }

    public ReqRes login(ReqRes loginRequest) {
        ReqRes response = new ReqRes();

        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                            loginRequest.getPassword()));
            var user = usersRepo.findByEmail(loginRequest.getEmail()).orElseThrow();
            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24HOURS");
            response.setMessage("login successful!");

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setError(e.getMessage());
            response.setStatusCode(200);
        }
        return response;
    }


    public ReqRes refreshToken(ReqRes refreshTokenRequest){
        ReqRes response = new ReqRes();

        try {
            String userEmail = jwtUtils.extractUserName(refreshTokenRequest.getToken());
            OurUsers user = usersRepo.findByEmail(userEmail).orElseThrow();
            if (jwtUtils.isTokenValid(refreshTokenRequest.getToken(), user)){
                var jwt = jwtUtils.generateToken(user);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshTokenRequest.getToken());
                response.setExpirationTime("24hours");
                response.setMessage("successfully refreshed token");
            }

        }catch (Exception e) {
            response.setStatusCode(500);
            response.setError(e.getMessage());
            response.setStatusCode(200);
        }
        return response;
    }


}