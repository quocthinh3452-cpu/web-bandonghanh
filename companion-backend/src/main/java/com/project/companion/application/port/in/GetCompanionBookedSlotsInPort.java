package com.project.companion.application.port.in;

import java.time.LocalDate;
import java.util.List;

public interface GetCompanionBookedSlotsInPort {
    List<String> execute(Long companionId, LocalDate date);
}
