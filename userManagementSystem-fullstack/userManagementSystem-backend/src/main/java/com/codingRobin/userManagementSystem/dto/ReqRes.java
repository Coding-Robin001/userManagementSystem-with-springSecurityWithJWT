package com.codingRobin.userManagementSystem.dto;

import com.codingRobin.userManagementSystem.entity.OurUsers;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReqRes {

    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private String city;
    private String name;
    private String role;
    private String email;

    @JsonProperty("password")
    private String password;

    private OurUsers ourUsers;
    private List<OurUsers> ourUsersList;
}
