export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: 'user' | 'admin';
  is_active: boolean;
  created_at: string;
}

export interface SkillProfile {
  id: number;
  user_id: number;
  career_goal: string;
  current_level: 'beginner' | 'intermediate' | 'advanced';
  math_algorithm_level: number;
  daily_study_hours: number;
  computer_specs: any;
  programming_experience: string;
  html_css_js_score: number;
  oop_sql_score: number;
  python_numpy_score: number;
  algorithm_score: number;
  overall_score: number;
  recommended_path: string;
  created_at: string;
}

export interface QuizQuestion {
  id: number;
  category: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer?: string;
  explanation?: string;
  difficulty_level: 'easy' | 'medium' | 'hard';
}

export interface QuizResult {
  id: number;
  user_id: number;
  category: string;
  total_questions: number;
  correct_answers: number;
  score_percentage: number;
  time_taken: number;
  answers: any;
  created_at: string;
}

export interface RoadmapTemplate {
  id: number;
  name: string;
  career_path: string;
  level_requirement: string;
  duration_weeks: number;
  description: string;
  weekly_plan: any;
  skills_covered: string[];
  prerequisites: string[];
  is_active: boolean;
  created_at: string;
}

export interface UserRoadmap {
  id: number;
  user_id: number;
  template_id?: number;
  title: string;
  personalized_plan: any;
  current_week: number;
  progress_percentage: number;
  is_active: boolean;
  started_at: string;
  completed_at?: string;
  created_at: string;
}

export interface TaskProgress {
  id: number;
  user_id: number;
  roadmap_id: number;
  task_type: 'daily_task' | 'weekly_goal' | 'milestone';
  task_name: string;
  description: string;
  week_number: number;
  day_number?: number;
  is_completed: boolean;
  completed_at?: string;
  due_date?: string;
  study_hours: number;
  notes: string;
  created_at: string;
}

export interface Resource {
  id: number;
  title: string;
  description: string;
  resource_type: 'video' | 'article' | 'course' | 'book' | 'exercise' | 'leetcode';
  url: string;
  skill_category: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  estimated_hours?: number;
  is_free: boolean;
  rating: number;
  tags: string[];
  thumbnail_url?: string;
  author: string;
  platform: string;
  is_active: boolean;
  created_at: string;
}

export interface UserProgress {
  id: number;
  user_id: number;
  resource_id: number;
  progress_percentage: number;
  time_spent: number;
  is_completed: boolean;
  rating?: number;
  notes: string;
  started_at: string;
  completed_at?: string;
  resource: Resource;
}

export interface ChatMessage {
  message: string;
  response: string;
  timestamp: string;
}

export interface CVData {
  personal_info: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    summary: string;
  };
  skills: string[];
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    details: string;
  }>;
  projects: Array<{
    name: string;
    technologies: string;
    description: string;
    url: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;
}

export interface AdminStats {
  statistics: {
    total_users: number;
    active_users: number;
    new_users_30_days: number;
    total_questions: number;
    total_resources: number;
    total_roadmaps: number;
    quiz_attempts: number;
  };
}