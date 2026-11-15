// Interface dùng chung toàn hệ thống

export type BookingStatus = 0 | 1 | 2; // 0: Chờ duyệt, 1: Đã nhận, 2: Đã hủy

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: 'customer' | 'companion';
}
