package com.project.companion.infrastructure.persistence.repository;

import com.project.companion.infrastructure.persistence.entity.BookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<BookingEntity, Long> {
    List<BookingEntity> findByCustomerIdOrderByBookingDateDesc(Long customerId);
}