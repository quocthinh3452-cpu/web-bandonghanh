package com.project.companion.application.port.in;

import com.project.companion.presentation.dto.BookingRequest;

public interface CreateBookingInPort {
    String execute(BookingRequest request);
}