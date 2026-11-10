package com.project.companion.infrastructure.persistence.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String fullName;
    private String role; // CUSTOMER, COMPANION, ADMIN
    private Integer status; // 1: Active
}