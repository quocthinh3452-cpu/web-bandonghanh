package com.project.companion.application.usecase;

import com.project.companion.application.port.in.GetCustomerBookingsInPort;
import com.project.companion.application.port.out.BookingOutPort;
import com.project.companion.presentation.dto.BookingHistoryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GetCustomerBookingsUseCase implements GetCustomerBookingsInPort {

    private final BookingOutPort bookingOutPort;

    @Override
    @Transactional(readOnly = true)
    public List<BookingHistoryResponse> execute(Long customerId) {
        return bookingOutPort.findBookingsByCustomerId(customerId).stream()
                .map(booking -> BookingHistoryResponse.builder()
                        .bookingId(booking.getId())
                        .companionName(booking.getCompanion().getFullName())
                        .bookingDate(booking.getBookingDate())
                        .startTime(booking.getStartTime())
                        .durationHours(booking.getDurationHours())
                        .location(booking.getLocation())
                        .totalPrice(booking.getTotalPrice())
                        .status(booking.getStatus())
                        .build())
                .toList();
    }
}