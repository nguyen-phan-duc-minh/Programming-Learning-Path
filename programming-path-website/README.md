# Programming Learning Path Website

Một website gợi ý lộ trình học lập trình tương tự như Codefinity.com

## Tính năng

- **Multi-step Survey**: Khảo sát 22 câu hỏi (27 nếu chọn "Both") để xác định lộ trình học phù hợp
- **Role-based Learning**: Hỗ trợ 3 lộ trình: Software Development, Data Science, hoặc cả hai
- **Personalized 30-day Schedule**: Lịch học cá nhân hóa trong 30 ngày
- **Progress Tracking**: Theo dõi tiến độ học tập
- **Google OAuth**: Đăng nhập bằng tài khoản Google (demo)

## Công nghệ sử dụng

### Backend
- Python Flask
- SQLite Database
- Google OAuth2
- JWT Authentication

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Responsive Design

## Cài đặt và chạy

### Cách nhanh nhất (Recommended)

```bash
# 1. Cài đặt tất cả dependencies
./setup.sh

# 2. Chạy cả frontend và backend
./run-dev.sh
```

### Cách thủ công

#### 1. Backend (Flask)

```bash
cd backend
pip3 install -r requirements.txt
python3 app.py
```

Backend sẽ chạy tại: http://localhost:5000

#### 2. Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Frontend sẽ chạy tại: http://localhost:3000

#### 3. Test API

```bash
./test-api.sh
```

## Cấu trúc dự án

```
programming-path-website/
├── backend/
│   ├── app.py              # Flask application
│   ├── requirements.txt    # Python dependencies
│   ├── .env               # Environment variables
│   └── programming_path.db # SQLite database (auto-generated)
├── frontend/
│   ├── src/app/
│   │   ├── page.tsx       # Trang chủ
│   │   ├── survey/        # Khảo sát
│   │   ├── auth/          # Đăng nhập
│   │   └── dashboard/     # Lịch học 30 ngày
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/survey` - Submit survey responses
- `POST /api/auth/google` - Google OAuth authentication
- `GET /api/learning-path/:id` - Get learning path details
- `POST /api/daily-schedule/:id/complete` - Mark day as complete

## Database Schema

### Users Table
- id, google_id, email, name, created_at

### Survey Table  
- id, user_id, role, experience_level, motivation, etc.

### LearningPath Table
- id, user_id, title, description, duration_days

### DailySchedule Table
- id, learning_path_id, day_number, title, content, estimated_hours, topics, completed

## Flow của ứng dụng

1. **Landing Page**: Giới thiệu website với animation loading
2. **Survey**: 22-27 câu hỏi được chia theo role:
   - Câu 1-6: Câu hỏi chung (role, experience, motivation, time, devices, learning style)
   - Câu 7-11: Câu hỏi theo role (5 câu cho Software Development hoặc Data Science)
   - Câu 12-22: Demographics và attitudes (11 câu cuối)
   - Nếu chọn "Both": 6 chung + 5 software + 5 data + 11 cuối = 27 câu
3. **Authentication**: Đăng nhập bằng Google (demo mode)
4. **Dashboard**: Hiển thị lịch học 30 ngày với:
   - Progress tracking
   - Calendar view
   - Day details modal
   - Completion tracking

## Tùy chỉnh

### Thêm câu hỏi mới
Chỉnh sửa object `questions` trong `/frontend/src/app/survey/page.tsx`

### Thêm lộ trình học mới
Chỉnh sửa functions trong `/backend/app.py`:
- `get_software_topics()`
- `get_data_science_topics()` 
- `get_combined_topics()`

### Cấu hình Google OAuth
1. Tạo project trên Google Cloud Console
2. Cập nhật `GOOGLE_CLIENT_ID` trong `/backend/.env`
3. Cấu hình OAuth consent screen và redirect URIs

## Demo Mode

Hiện tại ứng dụng chạy ở demo mode:
- Google OAuth được simulate với mock token
- Database sử dụng SQLite local
- Dữ liệu mẫu được tạo tự động

## Deployment

### Backend
- Deploy lên Heroku, Railway, hoặc VPS
- Cấu hình environment variables
- Setup production database (PostgreSQL)

### Frontend  
- Deploy lên Vercel, Netlify
- Cập nhật API URL trong config
- Setup domain và SSL

## License

MIT License