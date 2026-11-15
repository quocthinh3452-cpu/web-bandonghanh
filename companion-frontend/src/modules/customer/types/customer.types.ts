import { BookingStatus } from '@/shared/types/common.types';

// Interface Companion hiển thị trên trang khách hàng
export interface Companion {
  id: number;
  fullName: string;
  gender: number; // 0: Nữ, 1: Nam
  age: number;
  location: string;
  pricePerHour: number;
  bio?: string;
  avatarUrl: string;
  description?: string;
}

// Interface request đặt lịch
export interface BookingRequest {
  companionId: number;
  customerId: number;
  bookingDate: string;
  startTime: string;
  durationHours: number;
  location: string;
  totalPrice: number;
}

// Interface lịch sử đặt lịch
export interface BookingHistory {
  bookingId: number;
  companionName: string;
  bookingDate: string;
  startTime: string;
  durationHours: number;
  location: string;
  totalPrice: number;
  status: BookingStatus;
}
