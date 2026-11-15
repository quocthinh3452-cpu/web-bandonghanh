import { apiClient } from '@/shared/lib/apiClient';
import { Companion, BookingRequest, BookingHistory } from '../types/customer.types';

// Lấy danh sách companion có lọc
export async function getCompanions(filters: { location?: string; maxPrice?: string; gender?: string } = {}) {
  const params = new URLSearchParams();
  if (filters.location) params.append('location', filters.location);
  if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
  if (filters.gender) params.append('gender', filters.gender);

  return apiClient.get<Companion[]>(`/api/v1/customers/companions?${params.toString()}`);
}

// Lấy chi tiết một companion
export async function getCompanionById(id: number) {
  return apiClient.get<Companion>(`/api/v1/customers/companions/${id}`);
}

// Lấy lịch sử đặt lịch của khách hàng
export async function getBookingHistory(customerId: number) {
 return apiClient.get<BookingHistory[]>(`/api/v1/customers/${customerId}/bookings`);
}

// Tạo đơn đặt lịch mới
export async function createBooking(booking: BookingRequest) {
  return apiClient.post<string>('/api/v1/customers/bookings', booking);
}

// Hủy đơn đặt lịch
export async function cancelBooking(bookingId: number) {
  return apiClient.delete<string>(`/api/v1/customers/bookings/${bookingId}`);
}
// THÊM MỚI: Lấy các khung giờ đã bận trong ngày của người đồng hành
export async function getBookedSlots(companionId: number, date: string) {
  return apiClient.get<string[]>(
    `/api/v1/customers/companions/${companionId}/booked-slots?date=${date}`
  );
}


