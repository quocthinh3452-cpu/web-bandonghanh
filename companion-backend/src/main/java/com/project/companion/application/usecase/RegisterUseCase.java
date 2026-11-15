package com.project.companion.application.usecase;

import com.project.companion.application.port.in.RegisterInPort;
import com.project.companion.application.port.out.AuthOutPort;
import com.project.companion.infrastructure.persistence.entity.UserEntity;
import com.project.companion.infrastructure.security.JwtService;
import com.project.companion.presentation.dto.AuthResponse;
import com.project.companion.presentation.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RegisterUseCase implements RegisterInPort {

    private final AuthOutPort authOutPort;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    @Transactional
    public AuthResponse execute(RegisterRequest request) {
        if (authOutPort.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email này đã được sử dụng!");
        }

        UserEntity user = new UserEntity();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole() != null ? request.getRole() : "CUSTOMER");
        user.setStatus((byte) 1);
        user.setGender(request.getGender() != null ? request.getGender() : "Nam");
        user.setAge(request.getAge() != null ? request.getAge() : 20);
        user.setLocation(request.getLocation() != null ? request.getLocation() : "Hồ Chí Minh");
        user.setPricePerHour(request.getPricePerHour() != null ? request.getPricePerHour() : 0L);

        UserEntity savedUser = authOutPort.saveUser(user);
        String token = jwtService.generateToken(savedUser);

        return AuthResponse.builder()
                .token(token)
                .userId(savedUser.getId())
                .fullName(savedUser.getFullName())
                .email(savedUser.getEmail())
                .role(savedUser.getRole())
                .build();
    }
}