'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header, Footer } from '@/components/Layout';
import { BookOpen, User, BarChart, MessageCircle, FileText, Code, Star, Play, ArrowRight } from 'lucide-react';
import { FaLaptopCode, FaPalette, FaTheaterMasks, FaMask, FaMobileAlt, FaBolt, FaBullseye, FaBook, FaRocket, FaCalendarAlt, FaPhone, FaVideo, FaGraduationCap, FaComments, FaNewspaper } from 'react-icons/fa';

export default function HomePage() {
  const courseCategories = [
    { name: 'Lập Trình Web', icon: FaLaptopCode },
    { name: 'Thiết Kế UI/UX', icon: FaPalette },
    { name: 'Mobile App', icon: FaMobileAlt },
    { name: 'Backend Development', icon: FaBolt },
    { name: 'Data Science', icon: FaMask },
    { name: 'DevOps & Cloud', icon: FaTheaterMasks }
  ];

  const popularCourses = [
    {
      title: 'Khóa Học React.js Từ Cơ Bản Đến Nâng Cao',
      instructor: 'Nguyễn Văn Minh',
      rating: 5.0,
      reviews: '16.325',
      price: '999.000đ',
      originalPrice: null,
      image: '',
      category: 'Frontend',
      level: 'Cơ Bản'
    },
    {
      title: 'Lập Trình Node.js & Express.js Backend',
      instructor: 'Trần Thị Hương',
      rating: 5.0,
      reviews: '16.325',
      price: '1.299.000đ',
      originalPrice: null,
      image: '',
      category: 'Backend',
      level: 'Trung Cấp'
    },
    {
      title: 'Phát Triển Ứng Dụng Mobile với React Native',
      instructor: 'Lê Quang Huy',
      rating: 5.0,
      reviews: '16.325',
      price: '1.599.000đ',
      originalPrice: null,
      image: '',
      category: 'Mobile',
      level: 'Nâng Cao'
    },
    {
      title: 'Python & Django - Xây Dựng Web Application',
      instructor: 'Phạm Minh Tuấn',
      rating: 5.0,
      reviews: '16.325',
      price: '1.199.000đ',
      originalPrice: null,
      image: '',
      category: 'Backend',
      level: 'Trung Cấp'
    },
    {
      title: 'Data Science với Python - Phân Tích Dữ Liệu',
      instructor: 'Võ Thị Mai',
      rating: 5.0,
      reviews: '16.325',
      price: '1.799.000đ',
      originalPrice: null,
      image: '',
      category: 'Data Science',
      level: 'Cơ Bản'
    },
    {
      title: 'DevOps & AWS Cloud - Triển Khai Ứng Dụng',
      instructor: 'Hoàng Đức Nam',
      rating: 5.0,
      reviews: '16.325',
      price: '2.199.000đ',
      originalPrice: null,
      image: '',
      category: 'DevOps',
      level: 'Nâng Cao'
    }
  ];

  const upcomingCourses = [
    {
      title: 'Bootcamp Full-Stack JavaScript',
      instructor: 'Trần Văn Đức',
      date: '20 Tháng 12, 2024',
      image: ''
    },
    {
      title: 'Workshop Vue.js 3 & TypeScript',
      instructor: 'Nguyễn Thị Lan',
      date: '25 Tháng 12, 2024',
      image: ''
    },
    {
      title: 'Khóa Học Machine Learning Thực Hành',
      instructor: 'Lý Minh Khoa',
      date: '5 Tháng 1, 2025',
      image: ''
    },
    {
      title: 'Blockchain & Smart Contract Development',
      instructor: 'Phan Quốc Việt',
      date: '10 Tháng 1, 2025',
      image: ''
    }
  ];

  return (
    <div className="min-h-screen bg-transparent">
      <Header />

      {/* Hero Section */}
      <div className="relative bg-transparent min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-[#0156D2] space-y-8">
              <div className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 text-sm">
                <span className="text-yellow-300 mr-2">✓</span>
                Cam Kết 100% Hài Lòng
              </div>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Học Lập Trình Cùng
                <br />
                <span className="text-yellow-300">Giảng Viên Hàng Đầu</span>
              </h1>

              <p className="text-xl text-white/90 max-w-lg">
                Nền tảng học lập trình được cá nhân hóa với AI mentor thông minh,
                lộ trình học tập tối ưu và theo dõi tiến độ chi tiết.
              </p>

              <Link href="/register">
                <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-4 rounded-full text-lg">
                  Khám Phá Khóa Học
                </Button>
              </Link>
            </div>

            <div className="relative">
              {/* Placeholder for hero image */}
              <div className="w-full h-96 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <div className="text-white/50 text-center">
                  <User className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg">Hero Image Placeholder</p>
                </div>
              </div>

              {/* Floating testimonial card */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-4 shadow-2xl">
                <div className="flex items-center space-x-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-[#0156D2] rounded-full"></div>
                    <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                    <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">5.0k Học Viên</p>
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">4.8 Đánh Giá</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Categories Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 text-[#0156D2] text-sm font-medium mb-4">
              <FaBullseye className="w-4 h-4" />
              <span>DANH MỤC KHÓA HỌC</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Danh Mục Khóa Học Hàng Đầu
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {courseCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#0156D2] group-hover:text-white transition-colors">
                  <category.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Courses Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <div className="inline-flex items-center space-x-2 text-[#0156D2] text-sm font-medium mb-4">
                <FaBook className="w-4 h-4" />
                <span>KHÓA HỌC HÀNG ĐẦU</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Khóa Học Phổ Biến Nhất
              </h2>
            </div>
            <div className="hidden md:flex space-x-4">
              <Button variant="outline" size="sm">Tất Cả</Button>
              <Button variant="outline" size="sm">Frontend</Button>
              <Button variant="outline" size="sm">Backend</Button>
              <Button variant="outline" size="sm">Mobile</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCourses.map((course, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <Play className="w-12 h-12 text-gray-400" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[#0156D2] text-white">{course.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{course.rating}</span>
                      <span className="text-sm text-gray-500">({course.reviews})</span>
                    </div>
                    <span className="text-xs text-gray-500">{course.level}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">By {course.instructor}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-[#0156D2]">${course.price}</span>
                    </div>
                    <Button size="sm" className="bg-[#0156D2] hover:bg-[#013ba8]">
                      Thêm Vào Giỏ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Features Section */}
      <div className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 text-[#0156D2] text-sm font-medium mb-4">
                <FaRocket className="w-4 h-4" />
                <span>TẠI SAO CHỌ NỀN TẢNG CỦA CHÚNG TÔI</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Một Nền Tảng
                <br />
                <span className="text-[#0156D2]">Nhiều Khóa Học</span>
              </h2>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#0156D2] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>Hỗ Trợ 1-1 Cùng Mentor</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#0156D2] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>Lớp Học Offline Từ Giảng Viên Kinh Nghiệm</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#0156D2] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>Cam Kết Đánh Giá & Phản Hồi Từ Giảng Viên</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="w-full h-80 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <div className="text-white/50 text-center">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg">Platform Features Image</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-[#0156D2] rounded-2xl p-4 shadow-2xl">
                <div className="text-center">
                  <p className="text-2xl font-bold">24/7</p>
                  <p className="text-sm">HỖ TRỢ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Courses Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <div className="inline-flex items-center space-x-2 text-[#0156D2] text-sm font-medium mb-4">
                <FaCalendarAlt className="w-4 h-4" />
                <span>LớP HỌC OFFLINE SẮP DIỄN RA</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Khóa Học Sắp Diễn Ra
              </h2>
            </div>
            <Button className="bg-[#0156D2] hover:bg-[#013ba8]">
              Xem Tất Cả <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingCourses.map((course, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <BookOpen className="w-12 h-12 text-gray-400" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm line-clamp-2">{course.title}</h3>
                  <p className="text-xs text-gray-600 mb-2">By {course.instructor}</p>
                  <p className="text-xs text-[#0156D2] font-medium">{course.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Personalized Training Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 text-[#0156D2] text-sm font-medium mb-4">
              <FaPhone className="w-4 h-4" />
              <span>TƯ VẤN CÙNG GIẢNG VIÊN YÊU THÍCH</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12">
              Đào Tạo Cá Nhân Hóa
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Trần Minh Khoa', title: 'Senior Full-Stack Developer', image: '' },
              { name: 'Nguyễn Thu Hà', title: 'Chuyên Gia UX/UI', image: '' },
              { name: 'Lê Văn Thành', title: 'AI/ML Engineer', image: '' },
              { name: 'Phạm Thị Linh', title: 'Trưởng Phòng Công Nghệ', image: '' }
            ].map((instructor, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{instructor.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{instructor.title}</p>
                  <div className="flex justify-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xs">f</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xs">t</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xs">ig</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xs">in</span>
                    </div>
                  </div>
                  <Button className="w-full bg-[#0156D2]/10 text-[#0156D2] hover:bg-[#0156D2] hover:text-white">
                    Đặt Lịch Học
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Sections */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Become Instructor */}
            <div className="bg-gray-100 rounded-2xl p-8 flex items-center">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Khóa Học Lập Trình
                  <br />
                  Miễn Phí Online
                </h3>
                <p className="text-gray-600 mb-6">
                  Giảng viên hàng đầu trên thế giới giảng dạy cho hàng triệu học viên tại Coudemy.
                </p>
                <Button className="bg-[#0156D2] hover:bg-[#013ba8] text-white">
                  Trở Thành Giảng Viên
                </Button>
              </div>
              <div className="w-32 h-32 bg-white/50 rounded-full flex items-center justify-center ml-6">
                <User className="w-16 h-16 text-gray-400" />
              </div>
            </div>

            {/* Join Community */}
            <div className="bg-gray-100 rounded-2xl p-8 flex items-center">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Tham Gia Cộng Đồng
                  <br />
                  Lập Trình Viên
                </h3>
                <p className="text-gray-600 mb-6">
                  Giảng viên hàng đầu trên thế giới giảng dạy cho hàng triệu học viên tại Coudemy.
                </p>
                <Button className="bg-[#0156D2] hover:bg-[#013ba8] text-white">
                  Đăng Ký Miễn Phí
                </Button>
              </div>
              <div className="w-32 h-32 bg-white/50 rounded-full flex items-center justify-center ml-6">
                <MessageCircle className="w-16 h-16 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Tutorials Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 text-[#0156D2] text-sm font-medium mb-4">
              <FaVideo className="w-4 h-4" />
              <span>THƯ VIỆN VIDEO MỚI NHẤT</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Video Hướng Dẫn
              <br />
              Thay Đổi Cuộc Sống
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Lập Trình JavaScript Cơ Bản', instructor: 'Trần Minh Khoa', price: '299k', image: '' },
              { title: 'Xây Dựng API với Node.js', instructor: 'Nguyễn Văn Long', price: '499k', image: '' },
              { title: 'React.js Từ Zero Đến Hero', instructor: 'Lê Thị Mai', price: '699k', image: '' },
              { title: 'Database & MySQL Thực Hành', instructor: 'Phạm Quốc Việt', price: '399k', image: '' }
            ].map((video, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow relative">
                <div className="aspect-video bg-gray-300 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-[#0156D2]" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-[#0156D2] text-white">{video.price}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2">{video.title}</h3>
                  <p className="text-sm text-gray-600">By {video.instructor}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter & Contact Section */}
      <div className="py-16 bg-[#0156D2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Newsletter */}
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-6">Đăng Ký Nhận Bản Tin</h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Địa chỉ email"
                  className="flex-1 px-4 py-3 rounded-l-lg text-gray-900"
                />
                <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6 rounded-r-lg rounded-l-none">
                  Đăng Ký
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quan Tâm Thảo Luận</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Họ và tên"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0156D2]"
                />
                <input
                  type="email"
                  placeholder="Địa chỉ email"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0156D2]"
                />
                <input
                  type="tel"
                  placeholder="Số điện thoại"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0156D2]"
                />
                <textarea
                  placeholder="Viết tin nhắn"
                  rows={4}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0156D2] resize-none"
                />
                <Button className="w-full bg-[#0156D2] hover:bg-[#013ba8] text-white">
                  Gửi Yêu Cầu →
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>

      {/* Registration CTA Section */}
      <div className="py-16 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-gray-900/90 to-gray-900/70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 text-[#0156D2] text-sm font-medium mb-4">
                <FaGraduationCap className="w-4 h-4" />
                <span>ĐĂNG KÝ MIỄN PHÍ</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Đăng Ký Tài Khoản Và
                <br />
                Truy Cập Miễn Phí 78,540
                <br />
                Khóa Học Lập Trình
              </h2>
              <p className="text-white/80 mb-8 max-w-lg">
                Học lập trình online bao gồm nhiều bước quan trọng. Đầu tiên, bạn cần
                nghiên cứu và chọn khóa học phù hợp với mục tiêu và sở thích của mình.
                Sau khi đăng ký, hãy đảm bảo...
              </p>
            </div>
            <div className="w-full h-64 bg-white/10 rounded-2xl backdrop-blur-sm flex items-center justify-center">
              <div className="text-white/50 text-center">
                <FileText className="w-16 h-16 mx-auto mb-4" />
                <p className="text-lg">Registration Image Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 text-[#0156D2] text-sm font-medium mb-4">
              <FaComments className="w-4 h-4" />
              <span>HỌC VIÊN NÓI VỀ CHÚNG TÔI</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Học Viên Nói Gì Về Chúng Tôi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Nguyễn Văn An', role: 'Full-Stack Developer', image: '', rating: 5 },
              { name: 'Trần Thị Linh', role: 'Frontend Developer', image: '', rating: 5 },
              { name: 'Lê Minh Tuấn', role: 'Backend Engineer', image: '', rating: 5 },
              { name: 'Phạm Thu Hương', role: 'Mobile Developer', image: '', rating: 5 },
              { name: 'Võ Quốc Bảo', role: 'DevOps Engineer', image: '', rating: 5 }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                {index === 1 ? (
                  // Center testimonial with different layout
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="flex justify-center mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{testimonial.name}</h3>
                    <p className="text-[#0156D2] text-sm mb-4">{testimonial.role}</p>
                    <p className="text-gray-600 text-sm">
                      Coudemy đã giúp tôi học lập trình từ con số 0 và giờ đã có công việc mơ ước. Giảng viên rất tận tâm và chương trình học rất thực tế.
                    </p>
                  </div>
                ) : (
                  // Side testimonials with image overlay
                  <div className="relative">
                    <div className="aspect-video bg-linear-to-br from-gray-300 to-gray-500 rounded-lg mb-4 flex items-end p-4">
                      <div className="text-white">
                        <h3 className="font-bold text-lg">{testimonial.name}</h3>
                        <p className="text-sm opacity-90">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Khóa học rất bài bản và dễ hiểu. Tôi đã có thể áp dụng ngay vào công việc thực tế. Cảm ơn Coudemy rất nhiều!
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 text-[#0156D2] text-sm font-medium mb-4">
              <FaNewspaper className="w-4 h-4" />
              <span>TIN TỨC & BLOG</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Tin Tức & Blog Mới Nhất
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: 'Các Extension Hữu Ích Cho VS Code Frontend Developer',
                author: 'Coudemy_Team',
                excerpt: 'Khám phá những extension giúp tăng hiệu suất lập trình frontend và cải thiện trải nghiệm làm việc trên VS Code',
                image: '',
                comments: 5
              },
              {
                title: 'Thiết Kế API RESTful Hiệu Quả Với Node.js',
                author: 'Coudemy_Team',
                excerpt: 'Hướng dẫn chi tiết cách thiết kế và xây dựng API RESTful chuẩn và hiệu quả sử dụng Node.js và Express',
                image: '',
                comments: 5
              }
            ].map((blog, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="aspect-video md:aspect-square bg-gray-300 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-gray-400" />
                </div>
                <CardContent className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-600">By: {blog.author}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-3 line-clamp-2">{blog.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{blog.excerpt}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-500 text-sm">
                      <MessageCircle className="w-4 h-4" />
                      <span>Bình Luận ({blog.comments})</span>
                    </div>
                    <Button
                      size="sm"
                      className={index === 0 ? "bg-[#0156D2] hover:bg-[#013ba8]" : "bg-gray-900 hover:bg-gray-800"}
                    >
                      Đọc Tiếp <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
