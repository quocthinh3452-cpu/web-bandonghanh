package com.project.companion.infrastructure.persistence;

import com.project.companion.application.port.out.BookingOutPort;
import com.project.companion.infrastructure.persistence.entity.BookingEntity;
import com.project.companion.infrastructure.persistence.entity.UserEntity;
import com.project.companion.infrastructure.persistence.repository.BookingRepository;
import com.project.companion.infrastructure.persistence.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class BookingPersistenceAdapter implements BookingOutPort {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    @Override
    public Optional<UserEntity> findUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public void saveBooking(BookingEntity bookingEntity) {
        bookingRepository.save(bookingEntity);
    }
    // ... code cũ giữ nguyên
    @Override
    public java.util.List<BookingEntity> findBookingsByCustomerId(Long customerId) {
        return bookingRepository.findByCustomerIdOrderByBookingDateDesc(customerId);
    }
}