package com.project.companion.infrastructure.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "companion_profiles")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class CompanionProfileEntity {
    @Id
    private Long userId;

    private Byte gender; // 0: Nữ, 1: Nam
    private Integer age;
    private String location;
    private Integer pricePerHour;
    private String description;
    private String avatarUrl;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "user_id")
    private UserEntity user;
}