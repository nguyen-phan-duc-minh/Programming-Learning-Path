'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { Clock, CheckCircle } from 'lucide-react';
import Layout from '@/components/Layout';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [loading, setLoading] = useState(true);

  const category = params.category as string;

  useEffect(() => {
    if (user && category) {
      fetchQuestions();
    }
  }, [user, category]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleSubmit();
    }
  }, [timeLeft]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      // Mock questions for demo
      const mockQuestions: Question[] = [
        {
          id: '1',
          question: 'JavaScript là gì?',
          options: [
            'Một ngôn ngữ lập trình phía máy chủ',
            'Một ngôn ngữ lập trình phía máy khách',
            'Một framework CSS',
            'Một hệ quản trị cơ sở dữ liệu'
          ],
          correctAnswer: 1
        },
        {
          id: '2',
          question: 'HTML viết tắt của từ gì?',
          options: [
            'HyperText Markup Language',
            'High Tech Modern Language',
            'Home Tool Markup Language',
            'Hyperlink and Text Markup Language'
          ],
          correctAnswer: 0
        },
        {
          id: '3',
          question: 'CSS được sử dụng để làm gì?',
          options: [
            'Tạo cấu trúc trang web',
            'Xử lý dữ liệu',
            'Trang trí và định dạng trang web',
            'Quản lý cơ sở dữ liệu'
          ],
          correctAnswer: 2
        }
      ];
      setQuestions(mockQuestions);
      setAnswers(new Array(mockQuestions.length).fill(-1));
    } catch (error) {
      console.error('Lỗi khi tải câu hỏi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(answers[currentQuestion + 1] >= 0 ? answers[currentQuestion + 1] : null);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] >= 0 ? answers[currentQuestion - 1] : null);
    }
  };

  const handleSubmit = async () => {
    try {
      const finalAnswers = [...answers];
      if (selectedAnswer !== null) {
        finalAnswers[currentQuestion] = selectedAnswer;
      }

      // Mock submission for demo
      console.log('Submitting quiz:', { category, answers: finalAnswers });
      
      router.push(`/assessment?completed=${category}`);
    } catch (error) {
      console.error('Lỗi khi nộp bài:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getCategoryName = (cat: string) => {
    const categories: { [key: string]: string } = {
      'programming-basics': 'Kiến thức lập trình cơ bản',
      'web-development': 'Phát triển Web',
      'backend-development': 'Phát triển Backend',
      'algorithms': 'Thuật toán và Cấu trúc dữ liệu'
    };
    return categories[cat] || cat;
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">Đang tải câu hỏi...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (questions.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-gray-600">Không tìm thấy câu hỏi cho danh mục này.</p>
              <Button onClick={() => router.push('/assessment')} className="mt-4">
                Quay lại
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const currentQ = questions[currentQuestion];
  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {getCategoryName(category)}
              </h1>
              <div className="flex items-center space-x-2 text-[#0156D2]">
                <Clock className="w-5 h-5" />
                <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Câu hỏi {currentQuestion + 1} / {questions.length}</span>
                <span>{Math.round(progressPercentage)}% hoàn thành</span>
              </div>
              <Progress value={progressPercentage} className="w-full" />
            </div>
          </div>

          {/* Question */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl">
                {currentQ.question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedAnswer === index
                        ? 'border-[#0156D2] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          selectedAnswer === index
                            ? 'border-[#0156D2] bg-[#0156D2]'
                            : 'border-gray-300'
                        }`}
                      >
                        {selectedAnswer === index && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <span className="text-gray-900">{option}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Câu trước
            </Button>
            
            <div className="flex space-x-2">
              {currentQuestion === questions.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Nộp bài
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={selectedAnswer === null}
                  className="bg-[#0156D2] hover:bg-[#013ba8]"
                >
                  Câu tiếp theo
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}