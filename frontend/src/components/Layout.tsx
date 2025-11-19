import Link from 'next/link';
import { useState, useEffect } from "react";
import { Button } from '@/components/ui/button';
import { Code, BookOpen, Users, Star, Github, Twitter, Linkedin, Facebook, Instagram, 
         ClipboardCheck, Route, Library, Bot, FileText, User, Settings, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { href: '/dashboard', label: 'Bảng điều khiển', icon: Code },
    { href: '/assessment', label: 'Đánh giá kỹ năng', icon: ClipboardCheck },
    { href: '/roadmap', label: 'Lộ trình học', icon: Route },
    { href: '/resources', label: 'Tài liệu', icon: Library },
    { href: '/ai-chat', label: 'AI Mentor', icon: Bot },
    { href: '/cv', label: 'Tạo CV', icon: FileText },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-white shadow-md border-b border-gray-200"
        : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#0156D2] rounded-lg flex items-center justify-center">
              <img src="/favicon.png" alt="Coudemy" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#0156D2] bg-clip-text">Coudemy</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {user && (
            <nav className="hidden md:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-600 hover:text-[#0156D2] transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          )}

          {/* User Menu & Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Desktop User Menu */}
                <div className="hidden md:flex items-center space-x-4">
                  <Link href="/profile" className="flex items-center space-x-2 text-gray-600 hover:text-[#0156D2] transition-colors">
                    <User className="w-4 h-4" />
                    <span className="text-sm font-medium">Hồ sơ</span>
                  </Link>
                  {user.role === 'admin' && (
                    <Link href="/admin" className="flex items-center space-x-2 text-gray-600 hover:text-[#0156D2] transition-colors">
                      <Settings className="w-4 h-4" />
                      <span className="text-sm font-medium">Quản lý</span>
                    </Link>
                  )}
                  <Button
                    variant="ghost"
                    onClick={logout}
                    className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Đăng xuất</span>
                  </Button>
                </div>

                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" className="text-gray-600 text-sm font-bold cursor-pointer hover:text-[#0156D2]">
                    Đăng nhập
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-[#0156D2] font-bold text-sm hover:bg-[#013ba8] text-white cursor-pointer">
                    Bắt đầu miễn phí
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {user && mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-[#0156D2] hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
              <hr className="my-2" />
              <Link
                href="/profile"
                className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-[#0156D2] hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Hồ sơ</span>
              </Link>
              {user.role === 'admin' && (
                <Link
                  href="/admin"
                  className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-[#0156D2] hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Settings className="w-4 h-4" />
                  <span className="text-sm font-medium">Quản lý</span>
                </Link>
              )}
              <Button
                variant="ghost"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-md transition-colors justify-start"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Đăng xuất</span>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-transparent text-[#013ba8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-[#0156D2] rounded-lg flex items-center justify-center">
                <img src="/favicon.png" alt="Coudemy" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0156D2]">Coudemy</h3>
                <p className="text-sm text-gray-500 -mt-1">Nền tảng học lập trình cá nhân hóa</p>
              </div>
            </div>
            <p className="text-gray-500 max-w-md text-justify mb-4">
              Học lập trình thông minh hơn với AI mentor, lộ trình cá nhân hóa và theo dõi tiến độ chi tiết.
              Bắt đầu hành trình trở thành lập trình viên chuyên nghiệp ngay hôm nay.
            </p>

            <div className="text-gray-500 space-y-1 mb-6">
              <p>Cơ sở 1: 67 Nguyễn Thị Tú, Quận Bình Tân, TP.HCM</p>
              <p>Cơ sở 2: 88 Đồng Tâm, Huyện Hóc Môn, TP.HCM</p>
              <p>Email hỗ trợ: support@coudemy.com</p>
              <p>Email liên hệ: contact@coudemy.com</p>
              <p>Số điện thoại: 0934 1900 61</p>
            </div>

            <div className="flex space-x-4 mt-6">
              <a href="https://github.com/nguyen-phan-duc-minh" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#0156D2] transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/nguyen-phan-duc-minh" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#0156D2] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/nguyen-phan-duc-minh/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#0156D2] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://facebook.com/nguyen-phan-duc-minh" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#0156D2] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/nguyen-phan-duc-minh" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#0156D2] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="col-span-1 flex flex-col gap-4">
            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-xl mb-2">Liên kết nhanh</h4>
              <ul className="space-y-2 text-gray-500">
                <li><Link href="/register" className="hover:text-gray-800 transition-colors">Đăng ký học viên miễn phí</Link></li>
                <li><Link href="/login" className="hover:text-gray-800 transition-colors">Đăng nhập nhận voucher ưu đãi</Link></li>
                <li><Link href="/#features" className="hover:text-gray-800 transition-colors">Các tính năng nổi bật</Link></li>
                <li><Link href="/#about" className="hover:text-gray-800 transition-colors">Mọi thông tin về chúng tôi</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold text-xl mb-2">Hỗ trợ</h4>
              <ul className="space-y-2 text-gray-500">
                <li><a href="#" className="hover:text-gray-800 transition-colors">Liên hệ trung tâm trợ giúp</a></li>
                <li><a href="#" className="hover:text-gray-800 transition-colors">Liên hệ hotline</a></li>
                <li><a href="#" className="hover:text-gray-800 transition-colors">Điều khoản sử dụng</a></li>
                <li><a href="#" className="hover:text-gray-800 transition-colors">Chính sách bảo mật</a></li>
              </ul>
            </div>
          </div>

          <div className="col-span-1 flex flex-col gap-4">
            {/* Google Map */}
            <div className="space-y-2">
              <h4 className="font-bold text-xl mb-2">Địa chỉ</h4>
              <div className="mt-2 rounded-lg overflow-hidden shadow-lg border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.123456!2d106.123456!3d10.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752abcdef12345%3A0xabcdef1234567890!2s123%20Đường%20Lập%20Trình%2C%20Quận%201%2C%20TP.HCM!5e0!3m2!1svi!2s!4v1699999999999!5m2!1svi!2s"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2025 Coudemy. Tất cả quyền được bảo lưu.
          </p>
          <p className="text-gray-500 text-sm mt-2 md:mt-0">
            Được phát triển bởi <Link href="https://www.linkedin.com/in/nguyen-phan-duc-minh/">Nguyễn Phan Đức Minh</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}