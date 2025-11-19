'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { Route, CheckCircle, Clock, Target, BookOpen } from 'lucide-react';
import Layout from '@/components/Layout';

interface Task {
  id: string;
  title: string;
  description: string;
  progress: number;
  estimatedHours: number;
  completed: boolean;
  resources: string[];
}

interface RoadmapPhase {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
  completed: boolean;
}

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<RoadmapPhase[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchRoadmap();
    }
  }, [user]);

  const fetchRoadmap = async () => {
    try {
      setLoading(true);
      
      // Mock roadmap data for demo
      const mockRoadmap: RoadmapPhase[] = [
        {
          id: 'phase-1',
          title: 'Giai đoạn 1: Kiến thức nền tảng',
          description: 'Học các khái niệm cơ bản về lập trình và web development',
          completed: false,
          tasks: [
            {
              id: 'task-1',
              title: 'HTML & CSS cơ bản',
              description: 'Học cách tạo cấu trúc và trang trí trang web',
              progress: 75,
              estimatedHours: 20,
              completed: false,
              resources: ['HTML Tutorial', 'CSS Guide', 'Practice Projects']
            },
            {
              id: 'task-2',
              title: 'JavaScript Fundamentals',
              description: 'Nắm vững các khái niệm cơ bản của JavaScript',
              progress: 45,
              estimatedHours: 30,
              completed: false,
              resources: ['JS Documentation', 'MDN Guide', 'Interactive Exercises']
            },
            {
              id: 'task-3',
              title: 'Git & Version Control',
              description: 'Học cách quản lý code với Git',
              progress: 100,
              estimatedHours: 10,
              completed: true,
              resources: ['Git Tutorial', 'GitHub Guide']
            }
          ]
        },
        {
          id: 'phase-2',
          title: 'Giai đoạn 2: Frontend Development',
          description: 'Phát triển kỹ năng frontend với các framework hiện đại',
          completed: false,
          tasks: [
            {
              id: 'task-4',
              title: 'React Basics',
              description: 'Học React để xây dựng ứng dụng frontend',
              progress: 20,
              estimatedHours: 40,
              completed: false,
              resources: ['React Docs', 'Tutorial Projects', 'Best Practices']
            },
            {
              id: 'task-5',
              title: 'State Management',
              description: 'Học Redux/Context API để quản lý state',
              progress: 0,
              estimatedHours: 25,
              completed: false,
              resources: ['Redux Toolkit', 'Context API Guide']
            }
          ]
        },
        {
          id: 'phase-3',
          title: 'Giai đoạn 3: Backend Development',
          description: 'Xây dựng API và quản lý cơ sở dữ liệu',
          completed: false,
          tasks: [
            {
              id: 'task-6',
              title: 'Node.js & Express',
              description: 'Tạo REST API với Node.js',
              progress: 0,
              estimatedHours: 35,
              completed: false,
              resources: ['Express.js Guide', 'API Design', 'Authentication']
            }
          ]
        }
      ];

      setRoadmap(mockRoadmap);
    } catch (error) {
      console.error('Lỗi khi tải lộ trình:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTaskProgress = async (taskId: string, progress: number) => {
    try {
      // Mock API call
      console.log('Updating task progress:', taskId, progress);
      
      // Update local state
      setRoadmap(prev => prev.map(phase => ({
        ...phase,
        tasks: phase.tasks.map(task => 
          task.id === taskId 
            ? { ...task, progress, completed: progress >= 100 }
            : task
        )
      })));
    } catch (error) {
      console.error('Lỗi khi cập nhật tiến độ:', error);
    }
  };

  const getTotalProgress = () => {
    const allTasks = roadmap.flatMap(phase => phase.tasks);
    if (allTasks.length === 0) return 0;
    
    const totalProgress = allTasks.reduce((sum, task) => sum + task.progress, 0);
    return Math.round(totalProgress / allTasks.length);
  };

  const getCompletedTasks = () => {
    return roadmap.flatMap(phase => phase.tasks).filter(task => task.completed).length;
  };

  const getTotalTasks = () => {
    return roadmap.flatMap(phase => phase.tasks).length;
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">Đang tải lộ trình...</div>
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
                <Route className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Lộ trình học tập cá nhân
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Theo dõi tiến độ học tập và hoàn thành các mục tiêu được cá nhân hóa
            </p>
          </div>

          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tiến độ tổng thể</p>
                    <p className="text-2xl font-bold text-[#0156D2]">{getTotalProgress()}%</p>
                  </div>
                  <Target className="w-8 h-8 text-[#0156D2]" />
                </div>
                <Progress value={getTotalProgress()} className="mt-3" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Nhiệm vụ hoàn thành</p>
                    <p className="text-2xl font-bold text-green-600">
                      {getCompletedTasks()}/{getTotalTasks()}
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
                    <p className="text-2xl font-bold text-orange-600">
                      {roadmap.flatMap(p => p.tasks).reduce((sum, t) => sum + t.estimatedHours, 0)}h
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Roadmap Phases */}
          <div className="space-y-8">
            {roadmap.map((phase, phaseIndex) => (
              <Card key={phase.id} className="overflow-hidden">
                <CardHeader className="bg-linear-to-r from-[#0156D2] to-[#013ba8] text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{phase.title}</CardTitle>
                      <CardDescription className="text-blue-100 mt-1">
                        {phase.description}
                      </CardDescription>
                    </div>
                    {phase.completed && (
                      <CheckCircle className="w-6 h-6 text-green-300" />
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {phase.tasks.map((task, taskIndex) => (
                      <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-gray-900">{task.title}</h3>
                              {task.completed && (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              )}
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{task.estimatedHours}h</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <BookOpen className="w-4 h-4" />
                                <span>{task.resources.length} tài liệu</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right ml-4">
                            <div className="text-sm font-medium text-gray-900 mb-1">
                              {task.progress}%
                            </div>
                            <Progress value={task.progress} className="w-24" />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {task.resources.map((resource, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {resource}
                              </Badge>
                            ))}
                          </div>
                          
                          {!task.completed && (
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateTaskProgress(task.id, Math.min(task.progress + 25, 100))}
                              >
                                +25%
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => updateTaskProgress(task.id, 100)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Hoàn thành
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}