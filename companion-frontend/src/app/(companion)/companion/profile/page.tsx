'use client';
import { useState, useEffect } from 'react';
import { CompanionProfile, AvailableSlot } from '@/modules/companion/types/companion.types';
import ScheduleManager from '@/modules/companion/components/ScheduleManager';

export default function CompanionProfilePage() {
  const [profile, setProfile] = useState<CompanionProfile | null>(null);
  const [slots, setSlots] = useState<AvailableSlot[]>([]);
  const [loading, setLoading] = useState(true);

  // TODO: Thay companionId bằng ID lấy từ AuthContext
  const companionId = 1;

  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:8080/api/v1/companions/${companionId}/profile`).then(r => r.ok ? r.json() : null),
      fetch(`http://localhost:8080/api/v1/companions/${companionId}/slots`).then(r => r.ok ? r.json() : []),
    ])
      .then(([profileData, slotsData]) => {
        setProfile(profileData);
        setSlots(slotsData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSaveSlots = async (newSlots: AvailableSlot[]) => {
    await fetch(`http://localhost:8080/api/v1/companions/${companionId}/slots`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSlots),
    });
    setSlots(newSlots);
    alert('✅ Đã lưu lịch rảnh!');
  };

  if (loading) return <div className="p-8 text-red-500 font-bold">Đang tải...</div>;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white">👤 Hồ sơ của tôi</h1>
        <p className="text-gray-400 mt-1">Chỉnh sửa thông tin, giá và lịch rảnh</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Thông tin hồ sơ */}
        <div className="bg-[#1c1c24] border border-[#2d2d3a] rounded-2xl p-6 space-y-5">
          <h3 className="text-lg font-bold text-white">📝 Thông tin cơ bản</h3>
          
          <div>
            <label className="block text-sm text-gray-400 mb-1">Tên hiển thị</label>
            <input
              type="text"
              defaultValue={profile?.fullName}
              className="w-full bg-[#252530] text-gray-200 border border-[#333342] p-3 rounded-xl outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Giá mỗi giờ (VNĐ)</label>
            <input
              type="number"
              defaultValue={profile?.pricePerHour}
              className="w-full bg-[#252530] text-gray-200 border border-[#333342] p-3 rounded-xl outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Mô tả bản thân</label>
            <textarea
              rows={4}
              defaultValue={profile?.description}
              className="w-full bg-[#252530] text-gray-200 border border-[#333342] p-3 rounded-xl outline-none focus:border-red-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">URL ảnh đại diện</label>
            <input
              type="text"
              defaultValue={profile?.avatarUrl}
              className="w-full bg-[#252530] text-gray-200 border border-[#333342] p-3 rounded-xl outline-none focus:border-red-500"
            />
          </div>

          <button className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3.5 rounded-xl transition-all">
            Lưu thông tin
          </button>
        </div>

        {/* Lịch rảnh */}
        <ScheduleManager slots={slots} onSave={handleSaveSlots} />
      </div>
    </div>
  );
}
