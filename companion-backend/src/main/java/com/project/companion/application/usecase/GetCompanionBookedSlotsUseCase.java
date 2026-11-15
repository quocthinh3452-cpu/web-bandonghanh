package com.project.companion.application.usecase;

import com.project.companion.application.port.in.GetCompanionBookedSlotsInPort;
import com.project.companion.application.port.out.BookingOutPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GetCompanionBookedSlotsUseCase implements GetCompanionBookedSlotsInPort {

    private final BookingOutPort bookingOutPort;

    @Override
    @Transactional(readOnly = true)
    public List<String> execute(Long companionId, LocalDate date) {
        return bookingOutPort.findActiveBookingsByCompanionAndDate(companionId, date).stream()
                .map(b -> {
                    LocalTime start = b.getStartTime();
                    LocalTime end = start.plusHours(b.getDurationHours());
                    return start.toString().substring(0, 5) + " - " + end.toString().substring(0, 5);
                })
                .toList();
    }
}