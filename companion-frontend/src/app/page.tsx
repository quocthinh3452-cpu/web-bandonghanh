'use client';
import { useState, useEffect } from 'react';
import { Companion } from '@/types/companion';
import CompanionCard from '@/components/ui/CompanionCard';

export default function SearchCompanionsPage() {
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [filters, setFilters] = useState({ location: '', maxPrice: '', gender: '' });

  const fetchCompanions = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.location) params.append('location', filters.location);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.gender) params.append('gender', filters.gender);

      const res = await fetch(`http://localhost:8080/api/v1/customers/companions?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setCompanions(data);
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  };

  useEffect(() => {
    fetchCompanions();
  }, [filters]);

  return (
    // Đổi toàn bộ nền thành màu đen nhám đặc trưng của các trang Gaming
    <div className="min-h-screen bg-[#0b0b0f] pb-16 font-sans text-gray-200">
      
      {/* Banner phong cách PlayerDuo */}
      <div className="relative bg-gradient-to-r from-red-700 to-rose-500 pt-20 pb-24 px-4 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-black/20" /> {/* Overlay tối nhẹ */}
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-wide uppercase">
            Thuê Bạn Đồng Hành
          </h1>
          <p className="text-lg text-red-100 max-w-2xl mx-auto font-medium">
            Hàng ngàn trai xinh, gái đẹp luôn sẵn sàng trò chuyện, dạo phố và chơi game cùng bạn 24/7.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
        {/* Thanh công cụ lọc (Filter Bar) - Nổi lên trên banner */}
        <div className="flex flex-wrap gap-4 mb-10 bg-[#1c1c24] p-5 rounded-2xl shadow-xl border border-gray-800">
          <select 
            className="bg-[#252530] text-gray-200 border border-[#333342] p-3.5 rounded-xl flex-1 min-w-[200px] outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all cursor-pointer hover:bg-[#2a2a38]"
            onChange={e => setFilters({...filters, location: e.target.value})}
          >
            <option value="">🗺️ Tất cả khu vực</option>
            <option value="Hồ Chí Minh">Hồ Chí Minh</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="Đà Nẵng">Đà Nẵng</option>
          </select>

          <select 
            className="bg-[#252530] text-gray-200 border border-[#333342] p-3.5 rounded-xl flex-1 min-w-[200px] outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all cursor-pointer hover:bg-[#2a2a38]"
            onChange={e => setFilters({...filters, gender: e.target.value})}
          >
            <option value="">⚧ Tất cả giới tính</option>
            <option value="0">👩 Nữ</option>
            <option value="1">👨 Nam</option>
          </select>
          
          <input 
            type="number" 
            placeholder="💰 Mức giá tối đa (VNĐ)" 
            className="bg-[#252530] text-gray-200 border border-[#333342] p-3.5 rounded-xl flex-1 min-w-[200px] outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all hover:bg-[#2a2a38]"
            onChange={e => setFilters({...filters, maxPrice: e.target.value})}
          />
        </div>

        {/* Cập nhật số lượng kết quả */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Hot Player ⚡</h2>
          <span className="text-gray-400 text-sm">Tìm thấy {companions.length} kết quả</span>
        </div>

        {/* Danh sách Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {companions.map((comp) => (
            <CompanionCard key={comp.id} companion={comp} />
          ))}
          
          {companions.length === 0 && (
            <div className="col-span-full text-center py-20 bg-[#1c1c24] rounded-2xl border border-dashed border-gray-700">
              <span className="text-4xl block mb-3">👻</span>
              <p className="text-gray-400 text-lg">Không tìm thấy người đồng hành nào phù hợp với bộ lọc.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}