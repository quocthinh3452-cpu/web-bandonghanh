import { apiClient } from '@/shared/lib/apiClient';
import { CompanionProfile, RevenueStats, BookingRequest, AvailableSlot } from '../types/companion.types';

// Lấy thống kê doanh thu
export async function getRevenueStats(companionId: number) {
  return apiClient.get<RevenueStats>(`/api/v1/companions/${companionId}/stats`);
}

// Lấy danh sách đơn đặt lịch cần duyệt
export async function getBookingRequests(companionId: number) {
  return apiClient.get<BookingRequest[]>(`/api/v1/companions/${companionId}/bookings`);
}

// Xác nhận đơn đặt lịch
export async function confirmBooking(bookingId: number) {
  return apiClient.put<string>(`/api/v1/companions/bookings/${bookingId}/confirm`, {});
}

// Từ chối đơn đặt lịch
export async function rejectBooking(bookingId: number) {
  return apiClient.put<string>(`/api/v1/companions/bookings/${bookingId}/reject`, {});
}

// Lấy hồ sơ người đồng hành
export async function getCompanionProfile(companionId: number) {
  return apiClient.get<CompanionProfile>(`/api/v1/companions/${companionId}/profile`);
}

// Cập nhật hồ sơ (giá, ảnh, mô tả)
export async function updateCompanionProfile(companionId: number, data: Partial<CompanionProfile>) {
  return apiClient.put<string>(`/api/v1/companions/${companionId}/profile`, data);
}

// Lấy lịch rảnh
export async function getAvailableSlots(companionId: number) {
  return apiClient.get<AvailableSlot[]>(`/api/v1/companions/${companionId}/slots`);
}

// Cập nhật lịch rảnh
export async function updateAvailableSlots(companionId: number, slots: AvailableSlot[]) {
  return apiClient.put<string>(`/api/v1/companions/${companionId}/slots`, slots);
}
