package com.project.companion.presentation.dto;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class BookingRequest {
    private Long companionId;
    private Long customerId; // Tạm thời truyền tĩnh vì chưa làm Đăng nhập
    private LocalDate bookingDate;
    private LocalTime startTime;
    private Integer durationHours;
    private String location;
    private Long totalPrice;
}