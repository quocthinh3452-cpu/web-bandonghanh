'use client';
import { useState, useEffect } from 'react';
import { RevenueStats } from '@/modules/companion/types/companion.types';

export default function CompanionDashboardPage() {
  const [stats, setStats] = useState<RevenueStats | null>(null);

  useEffect(() => {
    // TODO: Thay companionId bằng ID lấy từ AuthContext
    const companionId = 1;
    fetch(`http://localhost:8080/api/v1/companions/${companionId}/stats`)
      .then(res => res.ok ? res.json() : null)
      .then(data => setStats(data))
      .catch(console.error);
  }, []);

  const statCards = [
    { label: 'Tổng doanh thu', value: stats ? `${stats.totalEarnings.toLocaleString('vi-VN')} đ` : '---', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20', icon: '💰' },
    { label: 'Đơn hoàn thành', value: stats?.completedBookings ?? '---', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', icon: '✅' },
    { label: 'Chờ xác nhận', value: stats?.pendingBookings ?? '---', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20', icon: '⏳' },
    { label: 'Đã hủy', value: stats?.cancelledBookings ?? '---', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', icon: '❌' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white">📊 Thống kê doanh thu</h1>
        <p className="text-gray-400 mt-1">Tổng quan hoạt động của bạn</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <div key={i} className={`${card.bg} border rounded-2xl p-6`}>
            <div className="text-3xl mb-3">{card.icon}</div>
            <div className={`text-2xl font-black ${card.color}`}>{card.value}</div>
            <div className="text-gray-400 text-sm mt-1">{card.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
