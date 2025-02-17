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
import java.util.List;
import java.util.Optional;

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
                response.setStatusCode(200);
                response.setMessage("User saved successfully!");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setError(e.getMessage());
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
            response.setRole(user.getRole());
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24HOURS");
            response.setMessage("login successful!");

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setError(e.getMessage());
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
            response.setStatusCode(200);
            return response;

        }catch (Exception e) {
            response.setStatusCode(500);
            response.setError(e.getMessage());
            return response;
        }
    }

    public ReqRes getAllUsers(){
        ReqRes response = new ReqRes();
        try {
            List<OurUsers> usersList = usersRepo.findAll();
            if (!usersList.isEmpty()){
                response.setOurUsersList(usersList);
                response.setStatusCode(200);
                response.setMessage("users list fetched successfully");
            } else {
                response.setStatusCode(404);
                response.setMessage("no users on the list/list empty!");
            }
            return response;

        }catch (Exception e){
            response.setStatusCode(500);
            response.setError("An error occurred " + e.getMessage());
            return response;
        }
    }

    public ReqRes getUserById(Integer id){
        ReqRes response = new ReqRes();

        try {
            OurUsers user = usersRepo.findById(id).orElseThrow(()-> new RuntimeException("User not found"));
            response.setOurUsers(user);
            response.setStatusCode(200);
            response.setMessage("User with " + id + " found successfully!");

        } catch (Exception e){
            response.setStatusCode(500);
            response.setError("An error occurred " + e.getMessage());
        }
        return response;
    }

    public ReqRes deleteUserById(Integer id){
        ReqRes response = new ReqRes();

        try {
            Optional<OurUsers> user = usersRepo.findById(id);
            if (user.isPresent()){
                usersRepo.deleteById(id);
                response.setStatusCode(200);
                response.setMessage("User with id " + id + " deleteted successfully!");
            } else {
                response.setStatusCode(404);
                response.setMessage("No user with id " + id + " found!");
            }

        }catch (Exception e){
            response.setStatusCode(500);
            response.setError("An error occurred while attempting to delete user " + e.getMessage());
        }
        return response;
    }

    public ReqRes updateUser(Integer id, OurUsers updatedUser) {
        ReqRes response = new ReqRes();

        try {
            Optional<OurUsers> user = usersRepo.findById(id);

            if (user.isPresent()) {
                OurUsers existingUser = user.get();
                existingUser.setName(updatedUser.getName());
                existingUser.setCity(updatedUser.getCity());
                existingUser.setEmail(updatedUser.getEmail());
                existingUser.setRole(updatedUser.getRole());

                if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                    existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
                }

                OurUsers newlyUpdatedUser = usersRepo.save(existingUser);
                response.setOurUsers(newlyUpdatedUser);
                response.setStatusCode(200);
                response.setMessage("User updated successfully!");
            } else {
                // 🔥 Add this part: return a response when user is not found
                response.setStatusCode(404);
                response.setError("User with ID " + id + " not found.");
            }
        } catch (Exception e) {
            // 🔥 Log the error for debugging
            e.printStackTrace();
            response.setStatusCode(500);
            response.setError("An error occurred while updating the user: " + e.getMessage());
        }

        return response; // 🔥 Ensure response is always returned
    }



    public ReqRes getMyInfo(String email){
        ReqRes response = new ReqRes();

        try {
            Optional<OurUsers> user = usersRepo.findByEmail(email);
            if (user.isPresent()){
                response.setOurUsers(user.get());
                response.setStatusCode(200);
                response.setMessage("successful!");
            }else {
                response.setStatusCode(404);
                response.setMessage("no user found!");
            }

        }catch (Exception e){
            response.setStatusCode(500);
            response.setError("An error occurred " + e.getMessage());
        }
        return response;
    }

}