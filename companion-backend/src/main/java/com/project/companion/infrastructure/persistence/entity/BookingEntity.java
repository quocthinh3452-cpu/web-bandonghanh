package com.project.companion.infrastructure.persistence.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Entity
@Table(name = "bookings")
public class BookingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private UserEntity customer; // SỬA THÀNH UserEntity

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "companion_id", referencedColumnName = "id")
    private UserEntity companion; // SỬA THÀNH UserEntity

    private LocalDate bookingDate;
    private LocalTime startTime;
    private Integer durationHours;
    private String location;
    private Long totalPrice;
    private Byte status;
}