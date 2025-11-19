import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

class ApiClient {
  private client;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = Cookies.get('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            const refreshToken = Cookies.get('refresh_token');
            if (refreshToken) {
              const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {}, {
                headers: {
                  'Authorization': `Bearer ${refreshToken}`
                }
              });
              
              const { access_token } = response.data;
              Cookies.set('access_token', access_token, { expires: 1 }); // 1 day
              
              // Retry original request with new token
              originalRequest.headers.Authorization = `Bearer ${access_token}`;
              return this.client(originalRequest);
            }
          } catch (refreshError) {
            // Refresh failed, redirect to login
            this.logout();
            if (typeof window !== 'undefined') {
              window.location.href = '/auth/login';
            }
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const response = await this.client.post('/auth/login', { email, password });
    return response.data;
  }

  async register(userData: any) {
    const response = await this.client.post('/auth/register', userData);
    return response.data;
  }

  async getCurrentUser() {
    const response = await this.client.get('/auth/me');
    return response.data;
  }

  async forgotPassword(email: string) {
    const response = await this.client.post('/auth/forgot-password', { email });
    return response.data;
  }

  async updateProfile(profileData: any) {
    const response = await this.client.put('/auth/profile', profileData);
    return response.data;
  }

  async changePassword(currentPassword: string, newPassword: string) {
    const response = await this.client.put('/auth/change-password', {
      current_password: currentPassword,
      new_password: newPassword
    });
    return response.data;
  }

  logout() {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
  }

  // Assessment endpoints
  async getAssessment() {
    const response = await this.client.get('/assessment');
    return response.data;
  }

  async submitAssessment(assessmentData: any) {
    const response = await this.client.post('/assessment/submit', assessmentData);
    return response.data;
  }

  async getQuizQuestions(category: string) {
    const response = await this.client.get(`/assessment/quiz/${category}`);
    return response.data;
  }

  async submitQuiz(quizData: { category: string; answers: any[] }) {
    const response = await this.client.post('/assessment/quiz/submit', quizData);
    return response.data;
  }

  // Roadmap endpoints
  async getRoadmap() {
    const response = await this.client.get('/roadmap');
    return response.data;
  }

  async generateRoadmap(preferences: any) {
    const response = await this.client.post('/roadmap/generate', preferences);
    return response.data;
  }

  async updateTaskProgress(taskId: string, progress: number) {
    const response = await this.client.put(`/roadmap/task/${taskId}/progress`, { progress });
    return response.data;
  }

  // Resources endpoints
  async getResources(category?: string, level?: string) {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (level) params.append('level', level);
    
    const response = await this.client.get(`/resources?${params.toString()}`);
    return response.data;
  }

  // AI Chat endpoints
  async getChatHistory() {
    const response = await this.client.get('/ai/chat/history');
    return response.data;
  }

  async sendMessage(message: string) {
    const response = await this.client.post('/ai/chat', { message });
    return response.data;
  }

  // CV endpoints
  async generateCV(cvData: any) {
    const response = await this.client.post('/cv/generate', cvData);
    return response.data;
  }

  async getCVTemplate() {
    const response = await this.client.get('/cv/template');
    return response.data;
  }

  // Admin endpoints
  async getDashboardStats() {
    const response = await this.client.get('/admin/dashboard/stats');
    return response.data;
  }

  async getUsers() {
    const response = await this.client.get('/admin/users');
    return response.data;
  }

  async createUser(userData: any) {
    const response = await this.client.post('/admin/users', userData);
    return response.data;
  }

  async updateUser(userId: string, userData: any) {
    const response = await this.client.put(`/admin/users/${userId}`, userData);
    return response.data;
  }

  async deleteUser(userId: string) {
    const response = await this.client.delete(`/admin/users/${userId}`);
    return response.data;
  }

  async getQuestions() {
    const response = await this.client.get('/admin/questions');
    return response.data;
  }

  async createQuestion(questionData: any) {
    const response = await this.client.post('/admin/questions', questionData);
    return response.data;
  }

  async updateQuestion(questionId: string, questionData: any) {
    const response = await this.client.put(`/admin/questions/${questionId}`, questionData);
    return response.data;
  }

  async deleteQuestion(questionId: string) {
    const response = await this.client.delete(`/admin/questions/${questionId}`);
    return response.data;
  }

  async getResourcesAdmin() {
    const response = await this.client.get('/admin/resources');
    return response.data;
  }

  async createResource(resourceData: any) {
    const response = await this.client.post('/admin/resources', resourceData);
    return response.data;
  }

  async updateResource(resourceId: string, resourceData: any) {
    const response = await this.client.put(`/admin/resources/${resourceId}`, resourceData);
    return response.data;
  }

  async deleteResource(resourceId: string) {
    const response = await this.client.delete(`/admin/resources/${resourceId}`);
    return response.data;
  }
}

export const api = new ApiClient();