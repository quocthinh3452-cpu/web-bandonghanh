import { BookingRequest } from '../types/companion.types';

interface Props {
  booking: BookingRequest;
  onConfirm: (id: number) => void;
  onReject: (id: number) => void;
}

export default function BookingRequestCard({ booking, onConfirm, onReject }: Props) {
  return (
    <div className="bg-[#1c1c24] border border-[#2d2d3a] rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg hover:border-red-500/30 transition-colors">
      
      {/* Thông tin khách hàng */}
      <div className="flex gap-4 items-center">
        <img
          src={`https://ui-avatars.com/api/?name=${booking.customerName}&background=random`}
          alt="avatar"
          className="w-14 h-14 rounded-xl object-cover border border-[#333342]"
        />
        <div>
          <h3 className="text-lg font-bold text-white">{booking.customerName}</h3>
          <p className="text-gray-400 text-sm">Mã đơn: #{booking.bookingId}</p>
        </div>
      </div>

      {/* Chi tiết lịch */}
      <div className="flex-1 bg-[#111116] p-4 rounded-xl border border-[#252530]">
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-300">
          <div><span className="text-gray-500">Ngày:</span> <br/> <strong>{booking.bookingDate}</strong></div>
          <div><span className="text-gray-500">Giờ:</span> <br/> <strong>{booking.startTime.substring(0, 5)}</strong> ({booking.durationHours}h)</div>
          <div className="col-span-2 truncate"><span className="text-gray-500">Địa điểm:</span> <br/> {booking.location}</div>
        </div>
      </div>

      {/* Giá & Hành động */}
      <div className="flex flex-col items-end gap-4 w-full md:w-auto">
        <div className="text-xl font-black text-white">
          {booking.totalPrice.toLocaleString('vi-VN')} đ
        </div>
        
        {booking.status === 0 && (
          <div className="flex gap-3">
            <button
              onClick={() => onConfirm(booking.bookingId)}
              className="bg-green-600 hover:bg-green-500 text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-[0_0_10px_rgba(34,197,94,0.2)] hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
            >
              ✅ Xác nhận
            </button>
            <button
              onClick={() => onReject(booking.bookingId)}
              className="bg-red-600 hover:bg-red-500 text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-[0_0_10px_rgba(239,68,68,0.2)] hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
            >
              ❌ Từ chối
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
