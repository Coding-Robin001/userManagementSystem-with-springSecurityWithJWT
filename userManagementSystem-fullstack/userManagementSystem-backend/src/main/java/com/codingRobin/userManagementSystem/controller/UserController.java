package com.codingRobin.userManagementSystem.controller;

import com.codingRobin.userManagementSystem.service.UsersManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UsersManagementService usersManagementService;


}
