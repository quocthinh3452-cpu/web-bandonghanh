package com.project.companion.application.port.out;

import com.project.companion.infrastructure.persistence.entity.BookingEntity;
import com.project.companion.infrastructure.persistence.entity.UserEntity;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
public interface BookingOutPort {
    Optional<UserEntity> findUserById(Long id);
    void saveBooking(BookingEntity bookingEntity);
    java.util.List<BookingEntity> findBookingsByCustomerId(Long customerId);

    // Thêm mới cho tính năng Hủy lịch & Xem lịch trống
    Optional<BookingEntity> findBookingById(Long bookingId);
    List<BookingEntity> findActiveBookingsByCompanionAndDate(Long companionId, LocalDate date);
}