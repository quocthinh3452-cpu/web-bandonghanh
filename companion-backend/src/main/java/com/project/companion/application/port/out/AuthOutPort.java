package com.project.companion.application.port.out;

import com.project.companion.infrastructure.persistence.entity.UserEntity;

import java.util.Optional;

public interface AuthOutPort {
    boolean existsByEmail(String email);
    Optional<UserEntity> findByEmail(String email);
    UserEntity saveUser(UserEntity user);
}
