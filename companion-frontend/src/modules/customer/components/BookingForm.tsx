'use client';

import { useState, useEffect } from 'react';
import MessageBox from '@/shared/components/MessageBox';
import { createBooking, getBookedSlots } from '@/modules/customer/services/customerService';
import { useAuth } from '@/shared/context/AuthContext';
import { useRouter } from 'next/navigation';
interface Props {
  companionId: number;
  pricePerHour: number;
}

export default function BookingForm({ companionId, pricePerHour }: Props) {
  const [form, setForm] = useState({
    date: '',
    time: '',
    hours: 1,
    location: '',
  });
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [messageBox, setMessageBox] = useState({
    isOpen: false,
    message: '',
    isSuccess: true,
  });

  // Tự động gọi API lấy các khung giờ đã bận mỗi khi đổi ngày hẹn
  useEffect(() => {
    if (!companionId || !form.date) {
      setBookedSlots([]);
      return;
    }

    getBookedSlots(companionId, form.date)
      .then((slots) => setBookedSlots(slots))
      .catch(() => setBookedSlots([]));
  }, [companionId, form.date]);
  const { user } = useAuth();
  const router = useRouter();
  // Tự xử lý kiểm tra dữ liệu và gọi API đặt lịch
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.date || !form.time || !form.location.trim()) {
      setMessageBox({
        isOpen: true,
        message: 'Vui lòng điền đầy đủ ngày, giờ và địa điểm!',
        isSuccess: false,
      });
      return;
    }
    if (!user) {
      router.push('/login');
      return;
    }
    setSubmitting(true);
    try {
      const successMsg = await createBooking({
        companionId,
        customerId: user.userId,
        bookingDate: form.date,
        startTime: form.time + ':00',
        durationHours: form.hours,
        location: form.location,
        totalPrice: pricePerHour * form.hours,
      });

      setMessageBox({
        isOpen: true,
        message: successMsg,
        isSuccess: true,
      });

      // Cập nhật lại danh sách khung giờ bận ngay sau khi đặt thành công
      const updatedSlots = await getBookedSlots(companionId, form.date);
      setBookedSlots(updatedSlots);

      // Reset giờ và địa điểm sau khi đặt xong
      setForm((prev) => ({ ...prev, time: '', location: '' }));
    } catch (error: unknown) {
      const errMsg =
        error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : 'Có lỗi xảy ra khi đặt lịch!';
      setMessageBox({
        isOpen: true,
        message: errMsg,
        isSuccess: false,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 sticky top-10 text-gray-900">
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {pricePerHour.toLocaleString('vi-VN')} đ{' '}
          <span className="text-base font-normal text-gray-500">/ giờ</span>
        </div>
        <hr className="my-6 border-gray-100" />

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ngày hẹn</label>
            <input
              type="date"
              value={form.date}
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />

            {/* Hiển thị trạng thái lịch trống / khung giờ đã bận */}
            {form.date && (
              <div className="mt-2 p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs">
                {bookedSlots.length === 0 ? (
                  <span className="text-emerald-600 font-semibold">
                    ✅ Cả ngày {form.date} hiện đang trống lịch!
                  </span>
                ) : (
                  <div>
                    <span className="text-amber-700 font-semibold block mb-1.5">
                      ⚠️ Khung giờ đã có người đặt:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {bookedSlots.map((slot, idx) => (
                        <span
                          key={idx}
                          className="bg-red-100 text-red-700 border border-red-200 px-2 py-0.5 rounded-md font-semibold"
                        >
                          {slot}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Giờ hẹn</label>
              <input
                type="time"
                value={form.time}
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Thời lượng (Giờ)</label>
              <input
                type="number"
                min="1"
                max="24"
                value={form.hours}
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={(e) => setForm({ ...form, hours: Number(e.target.value) })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Địa điểm gặp mặt</label>
            <input
              type="text"
              value={form.location}
              placeholder="Quán cafe, rạp phim..."
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-xl mt-6 flex justify-between items-center">
            <span className="font-medium text-gray-600">Tổng tiền tạm tính:</span>
            <span className="text-xl font-bold text-indigo-600">
              {(pricePerHour * form.hours).toLocaleString('vi-VN')} đ
            </span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold py-4 rounded-xl shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_20px_rgba(220,38,38,0.6)] hover:scale-[0.98] transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Đang xử lý...' : 'Xác nhận Đặt lịch'}
          </button>
        </form>
      </div>

      <MessageBox
        isOpen={messageBox.isOpen}
        message={messageBox.message}
        isSuccess={messageBox.isSuccess}
        onClose={() => setMessageBox({ ...messageBox, isOpen: false })}
      />
    </>
  );
}