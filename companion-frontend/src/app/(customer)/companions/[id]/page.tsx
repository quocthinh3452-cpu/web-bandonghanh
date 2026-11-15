'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import BookingForm from '@/modules/customer/components/BookingForm';
import { getCompanionById } from '@/modules/customer/services/customerService';
import { Companion } from '@/modules/customer/types/customer.types';

function CompanionDetailContent() {
  const params = useParams();
  const companionId = Number(params.id);

  const [companion, setCompanion] = useState<Companion | null>(null);

  useEffect(() => {
    if (!companionId) return;
    getCompanionById(companionId)
      .then((data) => setCompanion(data))
      .catch((err) => console.error('Lỗi tải chi tiết:', err));
  }, [companionId]);

  if (!companion) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-bold text-xl">
        Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0f] py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-indigo-400 hover:text-indigo-300 font-medium mb-6 transition"
        >
          ← Quay lại danh sách
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cột trái: Thông tin hồ sơ người đồng hành */}
          <div className="lg:col-span-2 bg-[#1c1c24] border border-[#2d2d3a] rounded-3xl p-8 flex flex-col sm:flex-row gap-8 shadow-xl">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                companion.fullName
              )}&background=random&size=256`}
              alt={companion.fullName}
              className="w-40 h-40 rounded-2xl object-cover border border-[#333342] shrink-0"
            />
            <div>
              <h1 className="text-3xl font-black text-white">{companion.fullName}</h1>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 px-3 py-1 rounded-full text-xs font-semibold">
                  📍 {companion.location}
                </span>
                <span className="bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-semibold">
                  👤 {companion.age} tuổi
                </span>
                <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold">
                  ⚧ {companion.gender}
                </span>
              </div>

              <div className="mt-6">
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Giới thiệu bản thân
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {companion.bio || 'Chưa có mô tả giới thiệu.'}
                </p>
              </div>
            </div>
          </div>

          {/* Cột phải: Form đặt lịch tự gọi API */}
          <div>
            <BookingForm
              companionId={companion.id}
              pricePerHour={companion.pricePerHour}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CompanionDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-red-500 font-bold text-xl">
          Đang tải trang...
        </div>
      }
    >
      <CompanionDetailContent />
    </Suspense>
  );
}