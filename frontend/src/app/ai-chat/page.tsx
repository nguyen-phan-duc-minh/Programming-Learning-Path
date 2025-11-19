'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { Bot, Send, User, Sparkles } from 'lucide-react';
import Layout from '@/components/Layout';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(true);
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      fetchChatHistory();
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchChatHistory = async () => {
    try {
      setChatLoading(true);
      
      // Mock chat history for demo
      const mockMessages: Message[] = [
        {
          id: '1',
          content: 'Chào bạn! Tôi là AI Mentor của Coudemy. Tôi có thể giúp bạn giải đáp các câu hỏi về lập trình, đưa ra lời khuyên học tập và hỗ trợ bạn trong hành trình phát triển kỹ năng.',
          sender: 'ai',
          timestamp: new Date(Date.now() - 10 * 60 * 1000)
        }
      ];

      setMessages(mockMessages);
    } catch (error) {
      console.error('Lỗi khi tải lịch sử chat:', error);
    } finally {
      setChatLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      // Mock AI response for demo
      setTimeout(() => {
        const aiResponses = [
          'Đó là một câu hỏi hay! Để trả lời tốt nhất, tôi cần hiểu rõ hơn về mức độ kinh nghiệm hiện tại của bạn. Bạn có thể chia sẻ thêm chi tiết không?',
          'Tôi hiểu vấn đề của bạn. Đây là một chủ đề phổ biến trong lập trình. Hãy để tôi giải thích từng bước...',
          'Cảm ơn bạn đã chia sẻ! Dựa trên những gì bạn mô tả, tôi khuyên bạn nên bắt đầu với những kiến thức cơ bản trước.',
          'Đó là một hướng tiếp cận tốt! Tôi có một số gợi ý để bạn có thể cải thiện kỹ năng này hiệu quả hơn.',
          'Tôi thấy bạn đang có tinh thần học hỏi rất tốt. Hãy tiếp tục duy trì động lực này và thực hành thường xuyên.'
        ];

        const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: randomResponse,
          sender: 'ai',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMessage]);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Lỗi khi gửi tin nhắn:', error);
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const suggestedQuestions = [
    'Tôi nên học ngôn ngữ lập trình nào đầu tiên?',
    'Làm thế nào để cải thiện kỹ năng debug code?',
    'Sự khác biệt giữa frontend và backend là gì?',
    'Tôi cần học những gì để trở thành fullstack developer?'
  ];

  if (chatLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">Đang tải cuộc trò chuyện...</div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-[#0156D2] rounded-full">
                <Bot className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              AI Mentor Chat
            </h1>
            <p className="text-gray-600">
              Trò chuyện với AI mentor để nhận lời khuyên học tập và giải đáp thắc mắc
            </p>
          </div>

          {/* Chat Container */}
          <Card className="h-[600px] flex flex-col">
            {/* Messages Area */}
            <CardContent className="flex-1 p-0 overflow-hidden">
              <div className="h-full p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`flex items-start space-x-2 max-w-[80%] ${
                          message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            message.sender === 'user'
                              ? 'bg-[#0156D2]'
                              : 'bg-linear-to-r from-purple-500 to-pink-500'
                          }`}
                        >
                          {message.sender === 'user' ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Sparkles className="w-4 h-4 text-white" />
                          )}
                        </div>
                        
                        <div
                          className={`rounded-lg px-4 py-2 ${
                            message.sender === 'user'
                              ? 'bg-[#0156D2] text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                            }`}
                          >
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Loading indicator */}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 rounded-full bg-linear-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-gray-100 rounded-lg px-4 py-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </CardContent>

            {/* Suggested Questions */}
            {messages.length <= 1 && (
              <div className="border-t p-4">
                <p className="text-sm text-gray-600 mb-3">Câu hỏi gợi ý:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setInputMessage(question)}
                      className="text-xs h-8"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập câu hỏi của bạn..."
                  disabled={loading}
                  className="flex-1"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || loading}
                  className="bg-[#0156D2] hover:bg-[#013ba8]"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Tips */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              💡 Mẹo: Hỏi câu hỏi cụ thể để nhận được câu trả lời hữu ích nhất
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}