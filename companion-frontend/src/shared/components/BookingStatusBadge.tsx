// BookingStatusBadge - Badge trạng thái dùng chung cho mọi trang

interface Props {
  status: number;
}

export default function BookingStatusBadge({ status }: Props) {
  switch (status) {
    case 0:
      return (
        <span className="bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 px-3 py-1 rounded-full text-sm font-bold shadow-[0_0_10px_rgba(234,179,8,0.2)]">
          ⏳ Chờ duyệt
        </span>
      );
    case 1:
      return (
        <span className="bg-green-500/20 text-green-400 border border-green-500/50 px-3 py-1 rounded-full text-sm font-bold shadow-[0_0_10px_rgba(34,197,94,0.2)]">
          ✅ Đã nhận
        </span>
      );
    case 2:
      return (
        <span className="bg-red-500/20 text-red-400 border border-red-500/50 px-3 py-1 rounded-full text-sm font-bold shadow-[0_0_10px_rgba(239,68,68,0.2)]">
          ❌ Đã hủy
        </span>
      );
    default:
      return (
        <span className="bg-gray-500/20 text-gray-400 border border-gray-500/50 px-3 py-1 rounded-full text-sm font-bold">
          Không rõ
        </span>
      );
  }
}
