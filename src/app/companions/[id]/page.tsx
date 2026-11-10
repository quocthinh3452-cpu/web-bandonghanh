'use client';
import { useState, useEffect, Suspense } from 'react';
import { Companion } from '@/types/companion';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// 1. TÁCH LOGIC VÀ GIAO DIỆN VÀO COMPONENT CON
function CompanionDetailContent() {
  const params = useParams();
  const companionId = params.id;

  const [companion, setCompanion] = useState<Companion | null>(null);
  const [bookingForm, setBookingForm] = useState({ date: '', time: '', hours: 1, location: '' });
  const [messageBox, setMessageBox] = useState({ isOpen: false, message: '', isSuccess: true });
  useEffect(() => {
    if (!companionId) return;

    const fetchDetail = async () => {
      const res = await fetch(`http://localhost:8080/api/v1/customers/companions/${companionId}`);
      if (res.ok) setCompanion(await res.json());
    };
    fetchDetail();
  }, [companionId]);
  const handleBooking = async () => {
    if (!bookingForm.date || !bookingForm.time || !bookingForm.location) {
      // Thay alert('Vui lòng điền đầy đủ...');
      setMessageBox({ isOpen: true, message: 'Vui lòng điền đầy đủ ngày, giờ và địa điểm!', isSuccess: false });
      return;
    }

    const requestBody = {
      companionId: Number(companionId),
      customerId: 1, 
      bookingDate: bookingForm.date, 
      startTime: bookingForm.time + ":00", 
      durationHours: bookingForm.hours,
      location: bookingForm.location,
      totalPrice: companion!.pricePerHour * bookingForm.hours
    };

    try {
      const res = await fetch('http://localhost:8080/api/v1/customers/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (res.ok) {
        const message = await res.text();
        // Thay alert('🎉 ' + message);
        setMessageBox({ isOpen: true, message: message, isSuccess: true });
      } else {
        // Thay alert('❌ Có lỗi xảy ra...');
        setMessageBox({ isOpen: true, message: 'Có lỗi xảy ra, vui lòng thử lại!', isSuccess: false });
      }
    } catch (error) {
      console.error("Lỗi gọi API:", error);
      // Thay alert('❌ Không thể kết nối...');
      setMessageBox({ isOpen: true, message: 'Không thể kết nối đến máy chủ!', isSuccess: false });
    }
  };
  if (!companion) return <div className="min-h-screen flex items-center justify-center text-indigo-600 font-medium">Đang tải dữ liệu...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">

        {/* Nút quay lại */}
        <Link href="/" className="text-indigo-600 hover:underline mb-6 inline-block font-medium">
          ← Quay lại danh sách
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* CỘT TRÁI: THÔNG TIN HỒ SƠ */}
          <div className="lg:w-2/3 space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8">
              <img
                src={companion.avatarUrl}
                alt="Avatar"
                className="w-40 h-40 md:w-56 md:h-56 rounded-2xl object-cover shadow-md"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">{companion.fullName}</h1>
                <div className="flex flex-wrap items-center text-gray-600 mt-4 gap-4 text-sm md:text-base">
                  <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">📍 {companion.location}</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full">👤 {companion.age} tuổi</span>
                  <span className="bg-pink-50 text-pink-600 px-3 py-1 rounded-full">
                    {companion.gender === 0 ? '👩 Nữ' : '👨 Nam'}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mt-6 mb-2">Giới thiệu bản thân</h3>
                <p className="text-gray-600 leading-relaxed">
                  {companion.description || "Người đồng hành này chưa cập nhật mô tả chi tiết."}
                </p>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: FORM ĐẶT LỊCH (Sticky) */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 sticky top-10">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {companion.pricePerHour.toLocaleString('vi-VN')} đ <span className="text-base font-normal text-gray-500">/ giờ</span>
              </div>
              <hr className="my-6 border-gray-100" />

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ngày hẹn</label>
                  <input type="date" className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    onChange={e => setBookingForm({ ...bookingForm, date: e.target.value })} />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giờ hẹn</label>
                    <input type="time" className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                      onChange={e => setBookingForm({ ...bookingForm, time: e.target.value })} />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Thời lượng (Giờ)</label>
                    <input type="number" min="1" max="24" defaultValue="1" className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                      onChange={e => setBookingForm({ ...bookingForm, hours: Number(e.target.value) })} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Địa điểm gặp mặt</label>
                  <input type="text" placeholder="Quán cafe, rạp phim..." className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    onChange={e => setBookingForm({ ...bookingForm, location: e.target.value })} />
                </div>

                <div className="bg-gray-50 p-4 rounded-xl mt-6 flex justify-between items-center">
                  <span className="font-medium text-gray-600">Tổng tiền tạm tính:</span>
                  <span className="text-xl font-bold text-indigo-600">
                    {(companion.pricePerHour * bookingForm.hours).toLocaleString('vi-VN')} đ
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleBooking} // QUAN TRỌNG: Xóa đoạn alert() cũ và đổi thành gọi hàm handleBooking
                  className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold py-4 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_20px_rgba(220,38,38,0.6)] hover:scale-[0.98] transition-all mt-4"
                >
                  Xác nhận Đặt lịch
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    {messageBox.isOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div className="bg-[#1c1c24] border border-[#2d2d3a] rounded-3xl p-8 max-w-sm w-full shadow-2xl transform transition-all text-center">
        
        {/* Biểu tượng trạng thái */}
        <div className={`text-6xl mb-4 ${messageBox.isSuccess ? 'text-green-500' : 'text-red-500'}`}>
          {messageBox.isSuccess ? '🎉' : '⚠️'}
        </div>
        
        {/* Tiêu đề & Nội dung */}
        <h3 className="text-2xl font-bold text-white mb-2">
          {messageBox.isSuccess ? 'Thành công!' : 'Thông báo'}
        </h3>
        <p className="text-gray-400 mb-8">{messageBox.message}</p>
        
        {/* Nút đóng */}
        <button 
          onClick={() => setMessageBox({ ...messageBox, isOpen: false })}
          className="w-full bg-[#2a2a38] hover:bg-[#333342] text-white font-semibold py-3.5 rounded-xl transition-all border border-[#3f3f5a]"
        >
          Đóng
        </button>
      </div>
    </div>
  )}

</div>  
    
  );
}

// 2. PAGE CHÍNH BỌC COMPONENT BẰNG SUSPENSE THEO LUẬT CỦA NEXT.JS 16
export default function CompanionDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-indigo-600 font-medium">Đang khởi tạo giao diện...</div>}>
      <CompanionDetailContent />
    </Suspense>
  );
}