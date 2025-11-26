// Survey Types
export interface SurveyData {
  role: string
  experience_level: string
  motivation: string
  time_commitment: string
  devices: string | string[]
  learning_style: string
  interests: string | string[]
  // Software-specific fields
  programming_experience?: string
  preferred_environment?: string
  project_type?: string
  learning_pace?: string
  // Data science-specific fields
  math_background?: string
  data_tools?: string | string[]
  industry_focus?: string
  data_size_comfort?: string
  // Final assessment fields
  confidence_level: string
  career_impact: string
  stress_level: string
  uncertainty: string
  barriers: string
  python_benefits: string
  quick_learning: string
  self_taught: string
  data_growth: string
  salary_potential: string
  age_range: string
}

// Learning Path Types
export interface LearningPath {
  id: number
  title: string
  description: string
  duration_days: number
}

export interface Video {
  title: string
  url: string
  duration: string
}

export interface Resource {
  title: string
  url: string
  type: string
}

export interface DailySchedule {
  id: number
  day_number: number
  title: string
  content: string
  estimated_hours: number
  topics: string[]
  videos: Video[]
  resources: Resource[]
  completed: boolean
}

export interface LearningPathWithSchedules extends LearningPath {
  daily_schedules: DailySchedule[]
}

// User Types
export interface User {
  id: number
  name: string
  email: string
  created_at?: string
}

// Auth Types
export interface AuthResponse {
  token: string
  user: User
  learning_path?: LearningPath
}

// API Response Types
export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  message?: string
}
