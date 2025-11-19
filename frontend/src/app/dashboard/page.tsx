'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigation } from '@/components/Navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Footer } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Target, 
  Clock, 
  TrendingUp, 
  Award, 
  Code,
  Calendar,
  CheckCircle 
} from 'lucide-react';
import { api } from '@/lib/api';
import { SkillProfile, UserRoadmap, TaskProgress } from '@/types';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();
  const [skillProfile, setSkillProfile] = useState<SkillProfile | null>(null);
  const [userRoadmap, setUserRoadmap] = useState<UserRoadmap | null>(null);
  const [currentTasks, setCurrentTasks] = useState<TaskProgress[]>([]);
  const [progressStats, setProgressStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch user profile and skill assessment
        const profileResponse = await api.getCurrentUser();
        setSkillProfile(profileResponse.skill_profile);

        // Fetch user roadmap if it exists
        try {
          const roadmapResponse = await api.getRoadmap();
          setUserRoadmap(roadmapResponse.roadmap);
          setCurrentTasks(roadmapResponse.current_tasks || []);
          setProgressStats(roadmapResponse.progress_stats);
        } catch (error) {
          // User might not have a roadmap yet
          console.log('No roadmap found for user');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getSkillLevel = (score: number) => {
    if (score >= 80) return { level: 'Nâng cao', color: 'bg-green-500' };
    if (score >= 60) return { level: 'Trung bình', color: 'bg-yellow-500' };
    if (score >= 40) return { level: 'Cơ bản', color: 'bg-orange-500' };
    return { level: 'Mới bắt đầu', color: 'bg-red-500' };
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Chào mừng trở lại, {user?.first_name}!
            </h1>
            <p className="text-gray-600 mt-2">
              Đây là tiến độ học tập và các nhiệm vụ sắp tới của bạn.
            </p>
          </div>

          {/* Assessment CTA if not completed */}
          {!skillProfile && (
            <Card className="mb-8 border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-900">
                  <Target className="w-5 h-5 mr-2" />
                  Hoàn thành đánh giá kỹ năng
                </CardTitle>
                <CardDescription className="text-blue-700">
                  Thực hiện đánh giá toàn diện để nhận được gợi ý học tập cá nhân hóa.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/assessment">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Bắt đầu đánh giá
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Skill Overview */}
              {skillProfile && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Tổng quan kỹ năng
                    </CardTitle>
                    <CardDescription>
                      Trình độ kỹ năng lập trình hiện tại của bạn
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">HTML/CSS/JS</span>
                          <Badge variant="secondary" className={getSkillLevel(skillProfile.html_css_js_score).color}>
                            {getSkillLevel(skillProfile.html_css_js_score).level}
                          </Badge>
                        </div>
                        <Progress value={skillProfile.html_css_js_score} className="h-2" />
                        <span className="text-xs text-gray-500">{skillProfile.html_css_js_score}%</span>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">OOP & SQL</span>
                          <Badge variant="secondary" className={getSkillLevel(skillProfile.oop_sql_score).color}>
                            {getSkillLevel(skillProfile.oop_sql_score).level}
                          </Badge>
                        </div>
                        <Progress value={skillProfile.oop_sql_score} className="h-2" />
                        <span className="text-xs text-gray-500">{skillProfile.oop_sql_score}%</span>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Python & NumPy</span>
                          <Badge variant="secondary" className={getSkillLevel(skillProfile.python_numpy_score).color}>
                            {getSkillLevel(skillProfile.python_numpy_score).level}
                          </Badge>
                        </div>
                        <Progress value={skillProfile.python_numpy_score} className="h-2" />
                        <span className="text-xs text-gray-500">{skillProfile.python_numpy_score}%</span>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Algorithms</span>
                          <Badge variant="secondary" className={getSkillLevel(skillProfile.algorithm_score).color}>
                            {getSkillLevel(skillProfile.algorithm_score).level}
                          </Badge>
                        </div>
                        <Progress value={skillProfile.algorithm_score} className="h-2" />
                        <span className="text-xs text-gray-500">{skillProfile.algorithm_score}%</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Điểm tổng thể</span>
                        <span className="text-2xl font-bold text-blue-600">
                          {skillProfile.overall_score}%
                        </span>
                      </div>
                      <Progress value={skillProfile.overall_score} className="h-3 mt-2" />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Current Tasks */}
              {currentTasks.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Nhiệm vụ hôm nay
                    </CardTitle>
                    <CardDescription>
                      Hoàn thành các nhiệm vụ này để tiến bộ trong lộ trình học tập
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {currentTasks.slice(0, 5).map((task) => (
                        <div key={task.id} className="flex items-center space-x-3 p-3 rounded-lg border">
                          <div className={`w-4 h-4 rounded-full ${task.is_completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <div className="flex-1">
                            <p className={`font-medium ${task.is_completed ? 'line-through text-gray-500' : ''}`}>
                              {task.task_name}
                            </p>
                            <p className="text-sm text-gray-600">{task.description}</p>
                          </div>
                          <Badge variant={task.is_completed ? 'default' : 'secondary'}>
                            {task.is_completed ? 'Hoàn thành' : 'Chưa làm'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    {currentTasks.length > 5 && (
                      <div className="mt-4">
                        <Link href="/roadmap">
                          <Button variant="outline" className="w-full">
                            Xem tất cả nhiệm vụ
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Generate Roadmap CTA if no roadmap */}
              {skillProfile && !userRoadmap && (
                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-900">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Tạo lộ trình học tập
                    </CardTitle>
                    <CardDescription className="text-green-700">
                      Tạo lộ trình học tập cá nhân hóa dựa trên kết quả đánh giá của bạn.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/roadmap">
                      <Button className="bg-green-600 hover:bg-green-700">
                        Tạo lộ trình
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Progress Stats */}
              {progressStats && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Thống kê tiến độ
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Tuần</span>
                      <span className="font-bold">{progressStats.current_week}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Nhiệm vụ hoàn thành</span>
                      <span className="font-bold">
                        {progressStats.completed_tasks}/{progressStats.total_tasks}
                      </span>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span>Overall Progress</span>
                        <span className="font-bold">{progressStats.progress_percentage}%</span>
                      </div>
                      <Progress value={progressStats.progress_percentage} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="w-5 h-5 mr-2" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/assessment" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Target className="w-4 h-4 mr-2" />
                      Take Quiz
                    </Button>
                  </Link>
                  <Link href="/resources" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Browse Resources
                    </Button>
                  </Link>
                  <Link href="/ai-chat" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Clock className="w-4 h-4 mr-2" />
                      AI Mentor
                    </Button>
                  </Link>
                  <Link href="/cv" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      Generate CV
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Career Goal */}
              {skillProfile && (
                <Card>
                  <CardHeader>
                    <CardTitle>Career Goal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge className="mb-2">{skillProfile.career_goal}</Badge>
                    <p className="text-sm text-gray-600">
                      {skillProfile.current_level} level • {skillProfile.daily_study_hours}h/day
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}