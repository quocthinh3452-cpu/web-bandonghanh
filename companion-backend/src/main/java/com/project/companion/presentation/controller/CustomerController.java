package com.project.companion.presentation.controller;

import com.project.companion.application.port.in.CreateBookingInPort;
import com.project.companion.application.port.in.GetCustomerBookingsInPort;
import com.project.companion.application.usecase.GetCompanionDetailUseCase;
import com.project.companion.application.usecase.SearchCompanionUseCase;
import com.project.companion.presentation.dto.BookingRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/customers")
@CrossOrigin(origins = "http://localhost:3000") // Mở CORS cho Next.js gọi API
@RequiredArgsConstructor
public class CustomerController {

    private final SearchCompanionUseCase searchCompanionUseCase;
    // Trong CustomerController.java
    private final CreateBookingInPort createBookingInPort;
    private final GetCustomerBookingsInPort getCustomerBookingsInPort;
    @GetMapping("/companions")
    public ResponseEntity<?> search(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Byte gender,
            @RequestParam(required = false) Integer maxPrice) {

        var result = searchCompanionUseCase.execute(location, gender, maxPrice);
        return ResponseEntity.ok(result);
    }
    private final GetCompanionDetailUseCase getCompanionDetailUseCase; // Nhớ khai báo biến này ở đầu class cùng với searchCompanionUseCase

    @GetMapping("/companions/{id}")
    public ResponseEntity<?> getCompanionDetail(@PathVariable Long id) {
        return ResponseEntity.ok(getCompanionDetailUseCase.execute(id));
    }
    @PostMapping("/bookings")
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest request) {
        try {
            String message = createBookingInPort.execute(request);
            return ResponseEntity.ok(message);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
 
    @GetMapping("/{customerId}/bookings")
    public ResponseEntity<?> getBookingHistory(@PathVariable Long customerId) {
        try {
            return ResponseEntity.ok(getCustomerBookingsInPort.execute(customerId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}