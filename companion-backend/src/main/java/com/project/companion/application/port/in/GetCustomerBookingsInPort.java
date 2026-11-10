package com.project.companion.application.port.in;
import com.project.companion.presentation.dto.BookingHistoryResponse;
import java.util.List;

public interface GetCustomerBookingsInPort {
    List<BookingHistoryResponse> execute(Long customerId);
}