package com.project.companion.presentation.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String fullName;
    private String email;
    private String password;
    private String role;
    private String gender;
    private Integer age;
    private String location;
    private Long pricePerHour;
}
