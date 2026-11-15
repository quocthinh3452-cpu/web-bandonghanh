package com.project.companion.application.port.in;

import com.project.companion.presentation.dto.AuthResponse;
import com.project.companion.presentation.dto.RegisterRequest;

public interface RegisterInPort {
    AuthResponse execute(RegisterRequest request);
}
