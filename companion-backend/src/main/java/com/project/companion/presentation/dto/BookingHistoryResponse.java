package com.project.companion.presentation.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
public class BookingHistoryResponse {
    private Long bookingId;
    private String companionName;
    private LocalDate bookingDate;
    private LocalTime startTime;
    private Integer durationHours;
    private String location;
    private Long totalPrice;
    private Byte status; // 0: Chờ xác nhận, 1: Đã nhận, 2: Đã hủy
}