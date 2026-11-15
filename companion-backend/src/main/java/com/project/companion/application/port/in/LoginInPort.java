package com.project.companion.application.port.in;

import com.project.companion.presentation.dto.AuthResponse;
import com.project.companion.presentation.dto.LoginRequest;

public interface LoginInPort {
    AuthResponse execute(LoginRequest request);
}