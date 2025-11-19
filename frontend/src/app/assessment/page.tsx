'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle, BookOpen, Clock, Trophy } from 'lucide-react';
import Layout from '@/components/Layout';
import Link from 'next/link';

interface AssessmentCategory {
  id: string;
  name: string;
  description: string;
  questionCount: number;
  completed: boolean;
  level: string;
}

export default function AssessmentPage() {
  const [categories, setCategories] = useState<AssessmentCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchAssessment();
    }
  }, [user]);

  const fetchAssessment = async () => {
    try {
      setLoading(true);
      // Mock data for demo
      const mockCategories: AssessmentCategory[] = [
        {
          id: 'programming-basics',
          name: 'Kiến thức lập trình cơ bản',
          description: 'Đánh giá hiểu biết về các khái niệm lập trình cơ bản',
          questionCount: 20,
          completed: false,
          level: 'Beginner'
        },
        {
          id: 'web-development',
          name: 'Phát triển Web',
          description: 'Đánh giá kỹ năng HTML, CSS, JavaScript',
          questionCount: 25,
          completed: false,
          level: 'Intermediate'
        },
        {
          id: 'backend-development',
          name: 'Phát triển Backend',
          description: 'Đánh giá kiến thức về server, database, API',
          questionCount: 30,
          completed: false,
          level: 'Advanced'
        },
        {
          id: 'algorithms',
          name: 'Thuật toán và Cấu trúc dữ liệu',
          description: 'Đánh giá khả năng giải quyết vấn đề và tư duy logic',
          questionCount: 15,
          completed: false,
          level: 'Intermediate'
        }
      ];
      setCategories(mockCategories);
    } catch (error) {
      console.error('Lỗi khi tải đánh giá:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">Đang tải...</div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-[#0156D2] rounded-full">
                <Trophy className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Đánh giá kỹ năng lập trình
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hoàn thành các bài đánh giá để hiểu rõ trình độ hiện tại và nhận lộ trình học tập phù hợp
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tổng số bài kiểm tra</p>
                    <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-[#0156D2]" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Đã hoàn thành</p>
                    <p className="text-2xl font-bold text-green-600">
                      {categories.filter(c => c.completed).length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Thời gian ước tính</p>
                    <p className="text-2xl font-bold text-[#0156D2]">45 phút</p>
                  </div>
                  <Clock className="w-8 h-8 text-[#0156D2]" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Assessment Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category) => (
              <Card key={category.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{category.name}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {category.description}
                      </CardDescription>
                    </div>
                    {category.completed && (
                      <CheckCircle className="w-6 h-6 text-green-600 shrink-0 ml-2" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={getLevelColor(category.level)}>
                      {category.level}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {category.questionCount} câu hỏi
                    </span>
                  </div>
                  
                  <Link href={`/assessment/quiz/${category.id}`}>
                    <Button 
                      className="w-full bg-[#0156D2] hover:bg-[#013ba8]"
                      disabled={category.completed}
                    >
                      {category.completed ? 'Đã hoàn thành' : 'Bắt đầu kiểm tra'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}