'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/shared/lib/apiClient';
import { useAuth, AuthUser } from '@/shared/context/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { saveAuth } = useAuth();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'CUSTOMER',
    gender: 'Nam',
    age: 22,
    location: 'Hồ Chí Minh',
    pricePerHour: 200000,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await apiClient.post<AuthUser & { token: string }>(
        '/api/v1/auth/register',
        form
      );
      saveAuth(res);
      router.push(res.role === 'COMPANION' ? '/companion/dashboard' : '/');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Đăng ký thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] flex items-center justify-center py-10 px-4">
      <div className="bg-[#1c1c24] border border-[#2d2d3a] rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <span className="text-red-500 text-3xl">🎮</span>
            <span className="text-white font-black text-2xl tracking-wider">T-COMPANION</span>
          </Link>
          <p className="text-gray-400 text-sm">Tạo tài khoản mới để bắt đầu trải nghiệm</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1.5">Vai trò tài khoản</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full bg-[#111116] border border-[#2d2d3a] rounded-xl px-4 py-3 text-white focus:border-red-500 outline-none"
            >
              <option value="CUSTOMER">Khách hàng (Tìm & thuê bạn đồng hành)</option>
              <option value="COMPANION">Người đồng hành (Nhận lịch & kiếm thu nhập)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1.5">Họ và tên</label>
            <input
              type="text"
              required
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              placeholder="Nguyễn Văn A"
              className="w-full bg-[#111116] border border-[#2d2d3a] rounded-xl px-4 py-3 text-white focus:border-red-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1.5">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="name@example.com"
              className="w-full bg-[#111116] border border-[#2d2d3a] rounded-xl px-4 py-3 text-white focus:border-red-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1.5">Mật khẩu</label>
            <input
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Ít nhất 6 ký tự"
              className="w-full bg-[#111116] border border-[#2d2d3a] rounded-xl px-4 py-3 text-white focus:border-red-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Giới tính</label>
              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="w-full bg-[#111116] border border-[#2d2d3a] rounded-xl px-3 py-3 text-white focus:border-red-500 outline-none"
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1.5">Khu vực</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full bg-[#111116] border border-[#2d2d3a] rounded-xl px-3 py-3 text-white focus:border-red-500 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)] mt-2 disabled:opacity-50"
          >
            {loading ? 'Đang tạo tài khoản...' : 'Đăng ký'}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Đã có tài khoản?{' '}
          <Link href="/login" className="text-red-400 hover:text-red-300 font-semibold">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}