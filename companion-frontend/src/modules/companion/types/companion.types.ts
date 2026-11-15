import { BookingStatus } from '@/shared/types/common.types';

// Interface thống kê doanh thu
export interface RevenueStats {
  totalEarnings: number;
  completedBookings: number;
  pendingBookings: number;
  cancelledBookings: number;
}

// Interface hồ sơ người đồng hành (dùng trong trang quản lý)
export interface CompanionProfile {
  id: number;
  fullName: string;
  gender: number;
  age: number;
  location: string;
  pricePerHour: number;
  avatarUrl: string;
  description?: string;
  isAvailable: boolean;
}

// Interface đơn đặt lịch (dùng trong trang duyệt lịch)
export interface BookingRequest {
  bookingId: number;
  customerName: string;
  bookingDate: string;
  startTime: string;
  durationHours: number;
  location: string;
  totalPrice: number;
  status: BookingStatus;
}

// Interface khung giờ rảnh
export interface AvailableSlot {
  dayOfWeek: number; // 0: Chủ nhật, 1-6: Thứ 2 - Thứ 7
  startTime: string;
  endTime: string;
}
