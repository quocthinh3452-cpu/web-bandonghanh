'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/companion/dashboard', label: '📊 Thống kê', icon: '📊' },
  { href: '/companion/bookings', label: '📋 Quản lý lịch', icon: '📋' },
  { href: '/companion/profile', label: '👤 Hồ sơ', icon: '👤' },
];

export default function CompanionSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-[#111116] border-r border-[#1c1c24] flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[#1c1c24]">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-red-500 text-2xl">🎮</span>
          <div>
            <span className="text-white font-black text-lg tracking-wider block">T-COMPANION</span>
            <span className="text-gray-500 text-xs">Trang quản trị</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all cursor-pointer
                  ${isActive
                    ? 'bg-red-600/20 text-red-400 border border-red-500/30'
                    : 'text-gray-400 hover:bg-[#1c1c24] hover:text-white'
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label.replace(item.icon + ' ', '')}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer sidebar */}
      <div className="p-4 border-t border-[#1c1c24]">
        <Link href="/">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-white hover:bg-[#1c1c24] transition-all cursor-pointer text-sm">
            <span>🏠</span>
            <span>Về trang khách</span>
          </div>
        </Link>
      </div>
    </aside>
  );
}
