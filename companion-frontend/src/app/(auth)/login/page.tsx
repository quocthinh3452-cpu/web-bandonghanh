'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/shared/lib/apiClient';
import { useAuth, AuthUser } from '@/shared/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { saveAuth } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await apiClient.post<AuthUser & { token: string }>('/api/v1/auth/login', form);
      saveAuth(res);
      router.push(res.role === 'COMPANION' ? '/companion/dashboard' : '/');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] flex items-center justify-center px-4">
      <div className="bg-[#1c1c24] border border-[#2d2d3a] rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <span className="text-red-500 text-3xl">🎮</span>
            <span className="text-white font-black text-2xl tracking-wider">T-COMPANION</span>
          </Link>
          <p className="text-gray-400 text-sm">Đăng nhập để đặt lịch và quản lý tài khoản</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              className="w-full bg-[#111116] border border-[#2d2d3a] rounded-xl px-4 py-3 text-white focus:border-red-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_0_15px_rgba(220,38,38,0.3)] mt-2 disabled:opacity-50"
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Chưa có tài khoản?{' '}
          <Link href="/register" className="text-red-400 hover:text-red-300 font-semibold">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}