package com.codingRobin.userManagementSystem.controller;

import com.codingRobin.userManagementSystem.dto.ReqRes;
import com.codingRobin.userManagementSystem.entity.OurUsers;
import com.codingRobin.userManagementSystem.service.UsersManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UsersManagementService usersManagementService;

    @PostMapping("/auth/register")
    public ResponseEntity<ReqRes> register(@RequestBody ReqRes regResData){
        return ResponseEntity.ok(usersManagementService.register(regResData));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<ReqRes> login(@RequestBody ReqRes regResData){
        return ResponseEntity.ok(usersManagementService.login(regResData));
    }

    @PostMapping("/auth/refreshToken")
    public ResponseEntity<ReqRes> refreshToken(@RequestBody ReqRes regResData){
        return ResponseEntity.ok(usersManagementService.refreshToken(regResData));
    }

    @GetMapping("/admin/getAllUsers")
    public ResponseEntity<ReqRes> getAllUsers(){
        return ResponseEntity.ok(usersManagementService.getAllUsers());
    }

    @GetMapping("/admin/getUser/{userId}")
    public ResponseEntity<ReqRes> getUserById(@PathVariable Integer userId){
        return ResponseEntity.ok(usersManagementService.getUserById(userId));
    }

    @GetMapping("/admin/updateUser/{userId}")
    public ResponseEntity<ReqRes> updateUserById(@PathVariable Integer userId, @RequestBody OurUsers regResData){
        return ResponseEntity.ok(usersManagementService.updateUser(userId, regResData));
    }

    @GetMapping("/adminuser/getProfile")
    public ResponseEntity<ReqRes> getProfile(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        ReqRes response = usersManagementService.getMyInfo(email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

}
