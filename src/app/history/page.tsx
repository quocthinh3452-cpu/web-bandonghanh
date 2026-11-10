'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface BookingHistory {
  bookingId: number;
  companionName: string;
  bookingDate: string;
  startTime: string;
  durationHours: number;
  location: string;
  totalPrice: number;
  status: number;
}

export default function BookingHistoryPage() {
  const [bookings, setBookings] = useState<BookingHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Tạm thời fix cứng ID khách hàng là 1 (Sẽ thay bằng Token khi làm tính năng Auth)
    const fetchBookings = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/v1/customers/1/bookings');
        if (res.ok) {
          const data = await res.json();
          setBookings(data);
        }
      } catch (error) {
        console.error("Lỗi lấy lịch sử:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Hàm render màu sắc tùy theo trạng thái đơn
  const renderStatus = (status: number) => {
    switch (status) {
      case 0: return <span className="bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 px-3 py-1 rounded-full text-sm font-bold shadow-[0_0_10px_rgba(234,179,8,0.2)]">⏳ Chờ xác nhận</span>;
      case 1: return <span className="bg-green-500/20 text-green-400 border border-green-500/50 px-3 py-1 rounded-full text-sm font-bold shadow-[0_0_10px_rgba(34,197,94,0.2)]">✅ Đã xác nhận</span>;
      case 2: return <span className="bg-red-500/20 text-red-400 border border-red-500/50 px-3 py-1 rounded-full text-sm font-bold shadow-[0_0_10px_rgba(239,68,68,0.2)]">❌ Đã hủy</span>;
      default: return <span className="bg-gray-500/20 text-gray-400 border border-gray-500/50 px-3 py-1 rounded-full text-sm font-bold">Không rõ</span>;
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-red-500 font-bold text-xl">Đang tải dữ liệu...</div>;

  return (
    <div className="min-h-screen bg-[#0b0b0f] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-8 border-l-4 border-red-600 pl-4">
          LỊCH SỬ THUÊ ĐỒNG HÀNH
        </h1>

        {bookings.length === 0 ? (
          <div className="bg-[#1c1c24] border border-[#2d2d3a] rounded-3xl p-12 text-center">
            <p className="text-gray-400 text-lg mb-6">Bạn chưa có lịch đặt nào.</p>
            <Link href="/companions">
              <button className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-xl transition-all">
                Tìm người đồng hành ngay
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div key={booking.bookingId} className="bg-[#1c1c24] border border-[#2d2d3a] hover:border-red-500/50 transition-colors rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg">
                
                {/* Thông tin chính */}
                <div className="flex gap-5 items-center w-full md:w-auto">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${booking.companionName}&background=random`} 
                    alt="avatar" 
                    className="w-16 h-16 rounded-xl object-cover border border-[#333342]" 
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">{booking.companionName}</h3>
                    <p className="text-gray-400 text-sm mt-1">Mã đơn: #{booking.bookingId}</p>
                  </div>
                </div>

                {/* Thời gian & Địa điểm */}
                <div className="flex-1 bg-[#111116] p-4 rounded-xl border border-[#252530] w-full md:w-auto">
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                    <div><span className="text-gray-500">Ngày:</span> <br/> <strong>{booking.bookingDate}</strong></div>
                    <div><span className="text-gray-500">Giờ bắt đầu:</span> <br/> <strong>{booking.startTime.substring(0, 5)}</strong> ({booking.durationHours} giờ)</div>
                    <div className="col-span-2 truncate"><span className="text-gray-500">Địa điểm:</span> <br/> {booking.location}</div>
                  </div>
                </div>

                {/* Giá tiền & Trạng thái */}
                <div className="flex flex-row md:flex-col justify-between items-center md:items-end w-full md:w-48 gap-4">
                  <div className="text-2xl font-black text-white">
                    {booking.totalPrice.toLocaleString('vi-VN')} đ
                  </div>
                  <div>{renderStatus(booking.status)}</div>
                </div>
                
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}