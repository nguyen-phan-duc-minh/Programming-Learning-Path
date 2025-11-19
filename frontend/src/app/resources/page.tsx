'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { Library, BookOpen, Clock, Star, Search } from 'lucide-react';
import Layout from '@/components/Layout';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'article' | 'tutorial' | 'book' | 'course';
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  url: string;
  duration?: string;
  rating: number;
  tags: string[];
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchResources();
    }
  }, [user]);

  useEffect(() => {
    filterResources();
  }, [resources, searchTerm, selectedCategory, selectedLevel]);

  const fetchResources = async () => {
    try {
      setLoading(true);
      
      // Mock resources data for demo
      const mockResources: Resource[] = [
        {
          id: '1',
          title: 'HTML & CSS Complete Course',
          description: 'Học HTML và CSS từ cơ bản đến nâng cao với các dự án thực tế',
          type: 'course',
          category: 'web-development',
          level: 'beginner',
          url: 'https://example.com/html-css-course',
          duration: '12 giờ',
          rating: 4.8,
          tags: ['HTML', 'CSS', 'Responsive Design']
        },
        {
          id: '2',
          title: 'JavaScript Fundamentals',
          description: 'Khóa học JavaScript cơ bản cho người mới bắt đầu',
          type: 'video',
          category: 'programming',
          level: 'beginner',
          url: 'https://example.com/js-fundamentals',
          duration: '8 giờ',
          rating: 4.7,
          tags: ['JavaScript', 'ES6', 'DOM Manipulation']
        },
        {
          id: '3',
          title: 'React Advanced Patterns',
          description: 'Các pattern nâng cao trong React để xây dựng ứng dụng phức tạp',
          type: 'article',
          category: 'react',
          level: 'advanced',
          url: 'https://example.com/react-patterns',
          rating: 4.9,
          tags: ['React', 'Hooks', 'Context API', 'Performance']
        },
        {
          id: '4',
          title: 'Node.js API Development',
          description: 'Xây dựng RESTful API với Node.js và Express',
          type: 'tutorial',
          category: 'backend',
          level: 'intermediate',
          url: 'https://example.com/nodejs-api',
          duration: '6 giờ',
          rating: 4.6,
          tags: ['Node.js', 'Express', 'MongoDB', 'API']
        },
        {
          id: '5',
          title: 'Database Design Principles',
          description: 'Nguyên tắc thiết kế cơ sở dữ liệu hiệu quả',
          type: 'book',
          category: 'database',
          level: 'intermediate',
          url: 'https://example.com/db-design',
          rating: 4.5,
          tags: ['Database', 'SQL', 'Normalization', 'Design']
        },
        {
          id: '6',
          title: 'Git Version Control',
          description: 'Học cách sử dụng Git để quản lý mã nguồn',
          type: 'tutorial',
          category: 'tools',
          level: 'beginner',
          url: 'https://example.com/git-tutorial',
          duration: '3 giờ',
          rating: 4.4,
          tags: ['Git', 'GitHub', 'Version Control']
        }
      ];

      setResources(mockResources);
    } catch (error) {
      console.error('Lỗi khi tải tài liệu:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterResources = () => {
    let filtered = resources;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }

    // Filter by level
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(resource => resource.level === selectedLevel);
    }

    setFilteredResources(filtered);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎥';
      case 'article': return '📄';
      case 'tutorial': return '📚';
      case 'book': return '📖';
      case 'course': return '🎓';
      default: return '📋';
    }
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      video: 'Video',
      article: 'Bài viết',
      tutorial: 'Hướng dẫn',
      book: 'Sách',
      course: 'Khóa học'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelLabel = (level: string) => {
    const labels = {
      beginner: 'Cơ bản',
      intermediate: 'Trung cấp',
      advanced: 'Nâng cao'
    };
    return labels[level as keyof typeof labels] || level;
  };

  const categories = [
    { value: 'all', label: 'Tất cả danh mục' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'programming', label: 'Lập trình' },
    { value: 'react', label: 'React' },
    { value: 'backend', label: 'Backend' },
    { value: 'database', label: 'Cơ sở dữ liệu' },
    { value: 'tools', label: 'Công cụ' }
  ];

  const levels = [
    { value: 'all', label: 'Tất cả cấp độ' },
    { value: 'beginner', label: 'Cơ bản' },
    { value: 'intermediate', label: 'Trung cấp' },
    { value: 'advanced', label: 'Nâng cao' }
  ];

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">Đang tải tài liệu...</div>
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
                <Library className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Thư viện tài liệu học tập
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Khám phá bộ sưu tập tài liệu được tuyển chọn và cá nhân hóa theo trình độ của bạn
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Tìm kiếm tài liệu..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="md:w-48">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:w-48">
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resources Grid */}
          {filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Không tìm thấy tài liệu
              </h3>
              <p className="text-gray-600">
                Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{getTypeIcon(resource.type)}</span>
                        <Badge variant="secondary" className="text-xs">
                          {getTypeLabel(resource.type)}
                        </Badge>
                      </div>
                      <Badge className={getLevelColor(resource.level)}>
                        {getLevelLabel(resource.level)}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">
                      {resource.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        {resource.duration && (
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{resource.duration}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{resource.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {resource.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{resource.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <Button 
                      className="w-full bg-[#0156D2] hover:bg-[#013ba8]"
                      onClick={() => window.open(resource.url, '_blank')}
                    >
                      Xem tài liệu
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}