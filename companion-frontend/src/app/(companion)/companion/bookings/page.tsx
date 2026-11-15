'use client';
import { useState, useEffect } from 'react';
import { BookingRequest } from '@/modules/companion/types/companion.types';
import BookingRequestCard from '@/modules/companion/components/BookingRequestCard';

export default function CompanionBookingsPage() {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // TODO: Thay companionId bằng ID lấy từ AuthContext
  const companionId = 1;

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/companions/${companionId}/bookings`)
      .then(res => res.ok ? res.json() : [])
      .then(data => setBookings(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleConfirm = async (bookingId: number) => {
    await fetch(`http://localhost:8080/api/v1/companions/bookings/${bookingId}/confirm`, { method: 'PUT' });
    setBookings(bookings.map(b => b.bookingId === bookingId ? { ...b, status: 1 } : b));
  };

  const handleReject = async (bookingId: number) => {
    await fetch(`http://localhost:8080/api/v1/companions/bookings/${bookingId}/reject`, { method: 'PUT' });
    setBookings(bookings.map(b => b.bookingId === bookingId ? { ...b, status: 2 } : b));
  };

  if (loading) return <div className="p-8 text-red-500 font-bold">Đang tải...</div>;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white">📋 Quản lý lịch đặt</h1>
        <p className="text-gray-400 mt-1">Duyệt hoặc từ chối các đơn đặt lịch</p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-[#1c1c24] border border-dashed border-[#2d2d3a] rounded-2xl p-12 text-center">
          <span className="text-4xl block mb-3">📭</span>
          <p className="text-gray-400">Chưa có đơn đặt lịch nào.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => (
            <BookingRequestCard
              key={booking.bookingId}
              booking={booking}
              onConfirm={handleConfirm}
              onReject={handleReject}
            />
          ))}
        </div>
      )}
    </div>
  );
}
