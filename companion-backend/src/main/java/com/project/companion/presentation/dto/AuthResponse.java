package com.project.companion.presentation.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponse {
    private String token;
    private Long userId;
    private String fullName;
    private String email;
    private String role;
}
