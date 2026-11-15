'use client';

import Link from 'next/link';
import { useAuth } from '@/shared/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-[#0b0b0f] border-b border-[#1c1c24] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-red-500 text-2xl">🎮</span>
            <span className="text-white font-black text-xl tracking-wider">T-COMPANION</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-red-500 font-semibold hover:text-red-400 transition">
              Thuê người chơi
            </Link>
            <Link href="/history" className="text-gray-400 font-medium hover:text-white transition">
              Lịch sử đặt
            </Link>
            {user?.role === 'COMPANION' && (
              <Link
                href="/companion/dashboard"
                className="text-amber-400 font-medium hover:text-amber-300 transition"
              >
                Kênh Đồng Hành
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-gray-300 hidden sm:inline">
                  Xin chào, <strong className="text-white">{user.fullName}</strong>
                </span>
                <button
                  onClick={logout}
                  className="bg-[#1c1c24] hover:bg-red-600/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-lg text-sm font-semibold transition"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className="text-gray-300 hover:text-white font-medium px-4 py-2 transition">
                    Đăng nhập
                  </button>
                </Link>
                <Link href="/register">
                  <button className="bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-lg font-bold transition-all shadow-[0_0_10px_rgba(220,38,38,0.3)]">
                    Đăng ký
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}