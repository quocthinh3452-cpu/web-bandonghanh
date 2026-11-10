package com.project.companion.infrastructure.persistence.repository;

import com.project.companion.infrastructure.persistence.entity.UserEntity; // IMPORT ĐÚNG ĐƯỜNG DẪN NÀY
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
}