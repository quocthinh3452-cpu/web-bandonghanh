package com.project.companion.application.port.out;

import com.project.companion.infrastructure.persistence.entity.BookingEntity;
import com.project.companion.infrastructure.persistence.entity.UserEntity;
import java.util.Optional;
public interface BookingOutPort {
    Optional<UserEntity> findUserById(Long id);
    void saveBooking(BookingEntity bookingEntity);
    java.util.List<BookingEntity> findBookingsByCustomerId(Long customerId);
}