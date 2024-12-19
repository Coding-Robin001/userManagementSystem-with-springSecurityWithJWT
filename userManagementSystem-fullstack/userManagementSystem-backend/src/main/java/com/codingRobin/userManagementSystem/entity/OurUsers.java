package com.codingRobin.userManagementSystem.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="ourUsers")
@Data
public class OurUsers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
}
