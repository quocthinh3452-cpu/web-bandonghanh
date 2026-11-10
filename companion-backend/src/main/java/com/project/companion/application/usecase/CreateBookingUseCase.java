package com.project.companion.application.usecase;

import com.project.companion.application.port.in.CreateBookingInPort;
import com.project.companion.application.port.out.BookingOutPort;
import com.project.companion.infrastructure.persistence.entity.BookingEntity;
import com.project.companion.presentation.dto.BookingRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CreateBookingUseCase implements CreateBookingInPort {

    // Gọi Port Out thay vì gọi trực tiếp Repository
    private final BookingOutPort bookingOutPort;

    @Override
    @Transactional
    public String execute(BookingRequest request) {
        // 1. Tìm thông tin khách hàng và người đồng hành qua Port Out
        var customer = bookingOutPort.findUserById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Khách hàng không tồn tại"));
        var companion = bookingOutPort.findUserById(request.getCompanionId())
                .orElseThrow(() -> new RuntimeException("Người đồng hành không tồn tại"));

        // 2. Tạo Entity đặt lịch
        BookingEntity booking = new BookingEntity();
        booking.setCustomer(customer);
        booking.setCompanion(companion);
        booking.setBookingDate(request.getBookingDate());
        booking.setStartTime(request.getStartTime());
        booking.setDurationHours(request.getDurationHours());
        booking.setLocation(request.getLocation());
        booking.setTotalPrice(request.getTotalPrice());
        booking.setStatus((byte) 0); // 0: Chờ xác nhận

        // 3. Lưu xuống Database qua Port Out
        bookingOutPort.saveBooking(booking);

        return "Đặt lịch thành công! Chờ người đồng hành xác nhận.";
    }
}