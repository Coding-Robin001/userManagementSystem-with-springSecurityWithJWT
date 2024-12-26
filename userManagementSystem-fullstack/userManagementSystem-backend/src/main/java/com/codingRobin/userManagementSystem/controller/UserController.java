package com.codingRobin.userManagementSystem.controller;

import com.codingRobin.userManagementSystem.dto.ReqRes;
import com.codingRobin.userManagementSystem.service.UsersManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UsersManagementService usersManagementService;

    @PostMapping("/auth/register")
    public ResponseEntity<ReqRes> register(@RequestBody ReqRes reg){
        return ResponseEntity.ok(usersManagementService.register(reg));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<ReqRes> login(@RequestBody ReqRes reg){
        return ResponseEntity.ok(usersManagementService.login(reg));
    }

    @PostMapping("/auth/refreshToken")
    public ResponseEntity<ReqRes> refreshToken(@RequestBody ReqRes reg){
        return ResponseEntity.ok(usersManagementService.refreshToken(reg));
    }

    @GetMapping("/admin/getAllUsers")
    public ResponseEntity<ReqRes> getAllUsers(){
        return ResponseEntity.ok(usersManagementService.getAllUsers());
    }

    @GetMapping("/admin/getUser/{userId}")
    public ResponseEntity<ReqRes> getUserById(@PathVariable Integer userId){
        return ResponseEntity.ok(usersManagementService.getUserById(userId));
    }



}
