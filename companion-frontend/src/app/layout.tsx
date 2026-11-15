import './globals.css';
import { AuthProvider } from '@/shared/context/AuthContext';

export const metadata = {
  title: 'T-Companion | Thuê Bạn Đồng Hành',
  description: 'Nền tảng kết nối và đặt lịch bạn đồng hành',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="bg-[#0b0b0f] text-white antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}