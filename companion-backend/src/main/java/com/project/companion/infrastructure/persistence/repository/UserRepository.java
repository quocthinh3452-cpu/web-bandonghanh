package com.project.companion.infrastructure.persistence.repository;

import com.project.companion.infrastructure.persistence.entity.UserEntity; // IMPORT ĐÚNG ĐƯỜNG DẪN NÀY
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);
    boolean existsByEmail(String email);
}