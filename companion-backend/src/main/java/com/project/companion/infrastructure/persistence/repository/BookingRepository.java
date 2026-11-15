package com.project.companion.infrastructure.persistence.repository;

import com.project.companion.infrastructure.persistence.entity.BookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<BookingEntity, Long> {
    List<BookingEntity> findByCustomerIdOrderByBookingDateDesc(Long customerId);

    // Lấy các lịch đang chờ duyệt (0) hoặc đã xác nhận (1) của người đồng hành trong ngày
    List<BookingEntity> findByCompanionIdAndBookingDateAndStatusIn(
            Long companionId, LocalDate bookingDate, List<Byte> statuses
    );
}