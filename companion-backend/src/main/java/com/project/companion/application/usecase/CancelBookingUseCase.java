package com.project.companion.application.usecase;

import com.project.companion.application.port.in.CancelBookingInPort;
import com.project.companion.application.port.out.BookingOutPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CancelBookingUseCase implements CancelBookingInPort {

    private final BookingOutPort bookingOutPort;

    @Override
    @Transactional
    public String execute(Long bookingId) {
        var booking = bookingOutPort.findBookingById(bookingId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn đặt lịch!"));

        if (booking.getStatus() != 0) {
            throw new RuntimeException("Chỉ có thể hủy đơn đang ở trạng thái Chờ xác nhận!");
        }

        booking.setStatus((byte) 2); // 2 = Đã hủy
        bookingOutPort.saveBooking(booking);
        return "Đã hủy lịch đặt thành công!";
    }
}