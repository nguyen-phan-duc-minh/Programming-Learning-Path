# Backend API - Programming Learning Path

## Cấu trúc Project

```
backend/
├── app.py                  # Entry point, Application factory
├── config.py               # Configuration management
├── init_db.py             # Database initialization script
├── requirements.txt        # Python dependencies
├── .env                   # Environment variables (không commit)
├── .env.example           # Environment variables template
│
├── models/                # Database models
│   ├── __init__.py       # Models package initialization
│   ├── user.py           # User model
│   ├── survey.py         # Survey model
│   ├── learning_path.py  # Learning path model
│   └── daily_schedule.py # Daily schedule model
│
├── routes/                # API routes (Blueprints)
│   ├── __init__.py       # Routes registration
│   ├── auth.py           # Authentication routes
│   ├── survey.py         # Survey routes
│   └── learning_path.py  # Learning path routes
│
├── services/              # Business logic layer
│   ├── __init__.py
│   ├── auth_service.py   # Authentication logic
│   ├── survey_service.py # Survey processing
│   └── learning_path_service.py  # Learning path generation
│
└── utils/                 # Utility functions
    ├── __init__.py
    └── learning_topics.py # Learning topics data
```

## Kiến trúc

### 1. Application Factory Pattern
File `app.py` sử dụng factory pattern để tạo Flask application:
- Dễ dàng tạo multiple instances cho testing
- Flexible configuration cho các môi trường khác nhau
- Clean separation of concerns

### 2. Blueprints
Routes được tổ chức thành blueprints:
- **auth_bp**: `/api/auth/*` - Authentication endpoints
- **survey_bp**: `/api/survey`, `/api/health` - Survey và health check
- **learning_path_bp**: `/api/learning-path/*` - Learning path management

### 3. Service Layer
Business logic được tách ra service layer:
- **AuthService**: Xử lý authentication với Google OAuth, JWT
- **SurveyService**: Xử lý survey submission
- **LearningPathService**: Generate và quản lý learning paths

### 4. Models Layer
Database models sử dụng SQLAlchemy ORM:
- **User**: User information và authentication
- **Survey**: Survey responses
- **LearningPath**: Personalized learning journey
- **DailySchedule**: Daily learning tasks

## API Endpoints

### Health Check
```
GET /api/health
```

### Authentication
```
POST /api/auth/google
Body: {
  "token": "google_oauth_token",
  "survey_id": 123 (optional)
}
```

### Survey
```
POST /api/survey
Body: {
  "role": "software|data|both",
  "experience_level": "beginner|intermediate|advanced",
  ... (các fields khác)
}
```

### Learning Path
```
GET /api/learning-path/<path_id>
```

```
POST /api/daily-schedule/<schedule_id>/complete
```

## Setup và Chạy

### 1. Cài đặt dependencies
```bash
pip install -r requirements.txt
```

### 2. Setup environment variables
```bash
cp .env.example .env
# Chỉnh sửa .env với các giá trị thực tế
```

### 3. Initialize database
```bash
python init_db.py
```

### 4. Chạy development server
```bash
python app.py
```

Server sẽ chạy tại: `http://localhost:5001`

## Configuration

File `config.py` chứa configuration cho các môi trường:
- **DevelopmentConfig**: Development mode với SQLite
- **ProductionConfig**: Production mode với external database
- **TestingConfig**: Testing mode với in-memory database

Environment được xác định bởi biến `FLASK_ENV`:
```bash
export FLASK_ENV=development  # hoặc production, testing
```

## Database

Project sử dụng SQLAlchemy với SQLite cho development.

### Relationships
- User 1-N Survey
- User 1-N LearningPath
- LearningPath 1-N DailySchedule

### Migrations
Hiện tại sử dụng `db.create_all()`. Có thể thêm Flask-Migrate sau này.

## Best Practices

1. **Separation of Concerns**: Models, Routes, Services, Utils riêng biệt
2. **DRY Principle**: Không lặp lại code, sử dụng services và utils
3. **Type Hints**: Thêm type hints cho functions (có thể cải thiện)
4. **Error Handling**: Try-catch blocks trong routes
5. **Documentation**: Docstrings cho functions và classes
6. **Security**: JWT for authentication, CORS configuration

## Future Improvements

- [ ] Thêm Flask-Migrate cho database migrations
- [ ] Implement rate limiting
- [ ] Add logging middleware
- [ ] Unit tests và integration tests
- [ ] API documentation với Swagger/OpenAPI
- [ ] Cache layer (Redis)
- [ ] Background tasks với Celery
- [ ] More robust error handling và validation
