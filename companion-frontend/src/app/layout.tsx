import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Chọn font chữ hiện đại
const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "T-Companion | Thuê Bạn Đồng Hành",
  description: "Nền tảng thuê bạn đồng hành, chơi game, giải trí số 1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      {/* Cấu trúc Layout: Navbar -> Nội dung chính (children) -> Footer */}
      <body className={`${inter.className} bg-[#0b0b0f] text-gray-200 min-h-screen flex flex-col`}>
        <Navbar />
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}