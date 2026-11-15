package com.project.companion.application.usecase;

import com.project.companion.application.port.in.CreateBookingInPort;
import com.project.companion.application.port.out.BookingOutPort;
import com.project.companion.infrastructure.persistence.entity.BookingEntity;
import com.project.companion.presentation.dto.BookingRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;

@Service
@RequiredArgsConstructor
public class CreateBookingUseCase implements CreateBookingInPort {

    private final BookingOutPort bookingOutPort;

    @Override
    @Transactional
    public String execute(BookingRequest request) {
        var customer = bookingOutPort.findUserById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Khách hàng không tồn tại"));
        var companion = bookingOutPort.findUserById(request.getCompanionId())
                .orElseThrow(() -> new RuntimeException("Người đồng hành không tồn tại"));

        // Kiểm tra trùng lịch trong ngày đã chọn
        var existingBookings = bookingOutPort.findActiveBookingsByCompanionAndDate(
                request.getCompanionId(), request.getBookingDate()
        );
        LocalTime newStart = request.getStartTime();
        LocalTime newEnd = newStart.plusHours(request.getDurationHours());

        for (BookingEntity existing : existingBookings) {
            LocalTime existStart = existing.getStartTime();
            LocalTime existEnd = existStart.plusHours(existing.getDurationHours());
            if (newStart.isBefore(existEnd) && newEnd.isAfter(existStart)) {
                throw new RuntimeException("Khung giờ " + existStart.toString().substring(0, 5)
                        + " - " + existEnd.toString().substring(0, 5) + " đã có người đặt!");
            }
        }

        BookingEntity booking = new BookingEntity();
        booking.setCustomer(customer);
        booking.setCompanion(companion);
        booking.setBookingDate(request.getBookingDate());
        booking.setStartTime(request.getStartTime());
        booking.setDurationHours(request.getDurationHours());
        booking.setLocation(request.getLocation());
        booking.setTotalPrice(request.getTotalPrice());
        booking.setStatus((byte) 0);

        bookingOutPort.saveBooking(booking);
        return "Đặt lịch thành công! Chờ người đồng hành xác nhận.";
    }
}