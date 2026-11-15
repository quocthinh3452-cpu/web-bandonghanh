// FilterBar - Thanh lọc khu vực, giới tính, giá

interface Filters {
  location: string;
  maxPrice: string;
  gender: string;
}

interface Props {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export default function FilterBar({ filters, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-4 mb-10 bg-[#1c1c24] p-5 rounded-2xl shadow-xl border border-gray-800">
      <select
        value={filters.location}
        className="bg-[#252530] text-gray-200 border border-[#333342] p-3.5 rounded-xl flex-1 min-w-[200px] outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all cursor-pointer hover:bg-[#2a2a38]"
        onChange={e => onChange({ ...filters, location: e.target.value })}
      >
        <option value="">🗺️ Tất cả khu vực</option>
        <option value="Hồ Chí Minh">Hồ Chí Minh</option>
        <option value="Hà Nội">Hà Nội</option>
        <option value="Đà Nẵng">Đà Nẵng</option>
      </select>

      <select
        value={filters.gender}
        className="bg-[#252530] text-gray-200 border border-[#333342] p-3.5 rounded-xl flex-1 min-w-[200px] outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all cursor-pointer hover:bg-[#2a2a38]"
        onChange={e => onChange({ ...filters, gender: e.target.value })}
      >
        <option value="">⚧ Tất cả giới tính</option>
        <option value="0">👩 Nữ</option>
        <option value="1">👨 Nam</option>
      </select>

      <input
        type="number"
        value={filters.maxPrice}
        placeholder="💰 Mức giá tối đa (VNĐ)"
        className="bg-[#252530] text-gray-200 border border-[#333342] p-3.5 rounded-xl flex-1 min-w-[200px] outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all hover:bg-[#2a2a38]"
        onChange={e => onChange({ ...filters, maxPrice: e.target.value })}
      />
    </div>
  );
}
