import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-[#0b0b0f] border-b border-[#1c1c24] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-red-500 text-2xl">🎮</span>
            <span className="text-white font-black text-xl tracking-wider">T-COMPANION</span>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-red-500 font-semibold hover:text-red-400 transition">Thuê người chơi</Link>
            
            {/* ĐÂY LÀ NÚT LỊCH SỬ VỪA ĐƯỢC THÊM VÀO */}
            <Link href="/history" className="text-gray-400 font-medium hover:text-white transition">Lịch sử đặt</Link>
            
            <Link href="#" className="text-gray-400 font-medium hover:text-white transition">Bảng xếp hạng</Link>
            <Link href="#" className="text-gray-400 font-medium hover:text-white transition">Cộng đồng</Link>
            <Link href="#" className="text-gray-400 font-medium hover:text-white transition">Nạp tiền</Link>
          </div>

          {/* Nút Đăng nhập / Đăng ký */}
          <div className="flex items-center gap-3">
            <Link href="#">
              <button className="text-gray-300 hover:text-white font-medium px-4 py-2 transition">
                Đăng nhập
              </button>
            </Link>
            <Link href="#">
              <button className="bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-lg font-bold transition-all shadow-[0_0_10px_rgba(220,38,38,0.3)] hover:shadow-[0_0_15px_rgba(220,38,38,0.6)]">
                Đăng ký
              </button>
            </Link>
          </div>
          
        </div>
      </div>
    </nav>
  );
}