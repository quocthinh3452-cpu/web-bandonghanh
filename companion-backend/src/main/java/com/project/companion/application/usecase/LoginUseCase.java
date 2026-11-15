package com.project.companion.application.usecase;

import com.project.companion.application.port.in.LoginInPort;
import com.project.companion.application.port.out.AuthOutPort;
import com.project.companion.infrastructure.security.JwtService;
import com.project.companion.presentation.dto.AuthResponse;
import com.project.companion.presentation.dto.LoginRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginUseCase implements LoginInPort {

    private final AuthOutPort authOutPort;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public AuthResponse execute(LoginRequest request) {
        var user = authOutPort.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email hoặc mật khẩu không chính xác!"));

        String storedPassword = user.getPassword();
        boolean isValidPassword = storedPassword != null && (
                storedPassword.startsWith("$2")
                        ? passwordEncoder.matches(request.getPassword(), storedPassword)
                        : storedPassword.equals(request.getPassword())
        );

        if (!isValidPassword) {
            throw new RuntimeException("Email hoặc mật khẩu không chính xác!");
        }

        String token = jwtService.generateToken(user);

        return AuthResponse.builder()
                .token(token)
                .userId(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }
}