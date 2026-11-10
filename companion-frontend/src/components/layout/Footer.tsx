export default function Footer() {
  return (
    <footer className="bg-[#0b0b0f] border-t border-[#1c1c24] pt-12 pb-6 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-red-500 text-2xl">🎮</span>
            <span className="text-white font-black text-xl tracking-wider">T-COMPANION</span>
          </div>
          <p className="text-sm leading-relaxed text-gray-500">
            Nền tảng kết nối bạn đồng hành, chơi game, trò chuyện giải trí hàng đầu. Đảm bảo uy tín, an toàn và bảo mật cho mọi giao dịch.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4">Về chúng tôi</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-red-500 transition">Giới thiệu</a></li>
            <li><a href="#" className="hover:text-red-500 transition">Liên hệ & Hỗ trợ</a></li>
            <li><a href="#" className="hover:text-red-500 transition">Điều khoản sử dụng</a></li>
            <li><a href="#" className="hover:text-red-500 transition">Chính sách bảo mật</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4">Dịch vụ</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-red-500 transition">Thuê người chơi game</a></li>
            <li><a href="#" className="hover:text-red-500 transition">Thuê người trò chuyện</a></li>
            <li><a href="#" className="hover:text-red-500 transition">Bảng xếp hạng Player</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4">Tải ứng dụng</h4>
          <div className="flex flex-col gap-3">
            <button className="bg-[#1c1c24] border border-[#2d2d3a] py-2 px-4 rounded-lg text-center hover:border-red-500 transition text-sm font-medium">
              Tải trên App Store
            </button>
            <button className="bg-[#1c1c24] border border-[#2d2d3a] py-2 px-4 rounded-lg text-center hover:border-red-500 transition text-sm font-medium">
              Tải trên Google Play
            </button>
          </div>
        </div>
      </div>
      
      <div className="text-center text-sm border-t border-[#1c1c24] pt-6 text-gray-600">
       © 2026 T-Companion. Đồ án Quản lý dịch vụ bạn đồng hành.
      </div>
    </footer>
  );
}