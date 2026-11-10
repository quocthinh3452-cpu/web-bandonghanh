import { Companion } from "@/types/companion";
import Link from "next/link";

export default function CompanionCard({ companion }: { companion: Companion }) {
  return (
    <div className="group bg-[#1c1c24] border border-[#2d2d3a] rounded-2xl overflow-hidden shadow-lg hover:shadow-red-500/20 hover:border-red-500/50 transition-all duration-300 flex flex-col h-full relative">
      
      {/* Ảnh đại diện & Gradient Overlay */}
      <div className="h-64 relative overflow-hidden bg-[#111116]">
        <img 
          src={companion.avatarUrl || `https://ui-avatars.com/api/?name=${companion.fullName}&background=random`} 
          alt={companion.fullName} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Lớp gradient đen mờ từ dưới lên để chữ không bị chìm */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c24] via-transparent to-transparent" />
        
        {/* Giá tiền nổi bật (Góc trên phải) */}
        <div className="absolute top-3 right-3 bg-red-600/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-sm font-bold text-white shadow-md">
          {companion.pricePerHour.toLocaleString('vi-VN')} đ/h
        </div>
      </div>
      
      {/* Thông tin */}
      <div className="p-5 flex flex-col flex-grow relative z-10 -mt-6">
        <h3 className="text-xl font-bold text-white mb-1 truncate drop-shadow-md">
          {companion.fullName}
        </h3>
        
        <div className="flex flex-wrap items-center text-gray-400 text-xs font-medium gap-2 mt-2">
          <span className="bg-[#252530] px-2 py-1 rounded-md border border-[#333342]">📍 {companion.location}</span>
          <span className="bg-[#252530] px-2 py-1 rounded-md border border-[#333342]">👤 {companion.age}T</span>
          <span className="bg-[#252530] px-2 py-1 rounded-md border border-[#333342]">
            {companion.gender === 0 ? '♀ Nữ' : '♂ Nam'}
          </span>
        </div>

        {/* Nút bấm (Đẩy xuống dưới cùng) */}
        <div className="mt-auto pt-6">
          <Link href={`/companions/${companion.id}`}>
            <button className="w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-500 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all duration-300">
              Thuê ngay
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}