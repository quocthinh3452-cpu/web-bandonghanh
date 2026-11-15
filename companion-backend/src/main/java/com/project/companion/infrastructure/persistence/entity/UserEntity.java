package com.project.companion.infrastructure.persistence.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(unique = true, length = 150)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String password;

    @Column(length = 20)
    private String phone;
    @Column(length = 50)
    private String role; // "CUSTOMER" hoặc "COMPANION"

    private Byte status = 1; // 1: Hoạt động, 0: Khóa (khớp với điều kiện u.status = 1)

    @Column(length = 20)
    private String gender;

    private Integer age;

    @Column(length = 100)
    private String location;

    @Column(name = "price_per_hour")
    private Long pricePerHour;

    @Column(columnDefinition = "TEXT")
    private String bio;
}