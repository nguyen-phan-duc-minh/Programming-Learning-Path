import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coudemy - Nền tảng học lập trình cá nhân hóa",
  description: "Nền tảng học lập trình được cá nhân hóa với đánh giá kỹ năng thông minh, AI mentor và lộ trình học tập chi tiết",
  keywords: "học lập trình, programming, coding, AI mentor, roadmap, skill assessment",
  authors: [{ name: "Coudemy Team" }],
  icons: {icon: "/favicon.ico", shortcut: "/favicon.ico", apple: "/favicon.ico"},
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="vi">
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
