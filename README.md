# Programming Learning Path

A full-stack web application for personalized programming learning path recommendations with AI-powered mentorship.

Author: Nguyen Phan Duc Minh

## Features

- **User Assessment & Skill Profiling**: Comprehensive quizzes to evaluate programming skills
- **Personalized Learning Roadmaps**: Customized learning paths based on user goals and skill level
- **AI Mentor Chat**: Interactive AI assistant powered by Ollama for programming guidance
- **Progress Tracking**: Detailed analytics and charts to monitor learning progress
- **Resource Recommendations**: Curated learning materials based on skill gaps
- **CV Generator**: Automated CV generation with skill integration
- **Admin Panel**: Complete administrative interface for content management

## Architecture

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **TailwindCSS** for styling
- **ShadCN UI** for components
- **Recharts** for data visualization

### Backend
- **Python Flask** with MVC architecture
- **SQLite** database with SQLAlchemy ORM
- **JWT Authentication** with refresh tokens
- **RESTful API** design
- **Ollama** integration for AI chat

## Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn
- Ollama (for AI chat functionality)

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Set up environment variables**
```bash
cp .env .env.local
# Edit .env.local with your configuration
```

5. **Initialize database with sample data**
```bash
python setup_data.py
```

6. **Start the Flask server**
```bash
python app.py
```

The backend will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.local.example .env.local
# Edit .env.local with your API URL
```

4. **Start the development server**
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Configuration

### Environment Variables

#### Backend (.env)
```bash
# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here

# Database
DATABASE_URL=sqlite:///learning_path.db

# JWT Configuration
JWT_ACCESS_TOKEN_EXPIRES=86400  # 1 day
JWT_REFRESH_TOKEN_EXPIRES=2592000  # 30 days

# Ollama Configuration
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama2

# CORS
FRONTEND_URL=http://localhost:3000

# Admin Account
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

#### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=Programming Learning Path
```

## Database Schema

### Core Models
- **User**: User accounts and authentication
- **SkillProfile**: User skill assessments and career goals
- **QuizQuestion**: Assessment questions and answers
- **QuizResult**: User quiz performance tracking
- **RoadmapTemplate**: Learning path templates
- **UserRoadmap**: Personalized user learning paths
- **TaskProgress**: Daily/weekly task completion tracking
- **Resource**: Learning materials and resources
- **UserProgress**: Resource completion tracking

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Password reset
- `PUT /api/auth/change-password` - Change password

### Assessment
- `POST /api/assessment/submit` - Submit skill assessment
- `GET /api/assessment/quiz/{category}` - Get quiz questions
- `POST /api/assessment/quiz/submit` - Submit quiz answers
- `GET /api/assessment/profile` - Get user profile

### Roadmap
- `POST /api/roadmap/generate` - Generate personalized roadmap
- `GET /api/roadmap/user` - Get user's roadmap
- `PUT /api/roadmap/progress/update` - Update task progress

### Resources
- `GET /api/resources/` - Get learning resources
- `GET /api/resources/personalized` - Get personalized recommendations
- `POST /api/resources/progress` - Track resource progress

### AI Chat
- `POST /api/ai/chat` - Chat with AI mentor
- `GET /api/ai/history` - Get chat history

### CV Generation
- `POST /api/cv/generate` - Generate CV PDF
- `GET /api/cv/template` - Get CV template

### Admin (Admin only)
- `GET /api/admin/users` - Get all users
- `GET /api/admin/dashboard/stats` - Get system statistics
- `POST /api/admin/quiz/questions` - Create quiz questions
- `POST /api/admin/resources` - Create learning resources

## Usage

### For Learners

1. **Register/Login**: Create an account or sign in
2. **Take Assessment**: Complete skill evaluation quizzes
3. **Get Roadmap**: Generate personalized learning path
4. **Track Progress**: Monitor daily/weekly task completion
5. **Use Resources**: Access recommended learning materials
6. **Chat with AI**: Get programming help from AI mentor
7. **Generate CV**: Create professional developer CV

### For Administrators

1. **Dashboard**: View system statistics and user analytics
2. **User Management**: Monitor and manage user accounts
3. **Content Management**: Add/edit quiz questions and resources
4. **Roadmap Templates**: Create and manage learning path templates

## Sample Accounts

After running `setup_data.py`, you can use these demo accounts:

- **Admin**: `admin@example.com` / `admin123`
- **User**: `john.doe@example.com` / `password123`

## AI Integration

The system integrates with Ollama for AI mentorship:

1. **Install Ollama**: Follow instructions at https://ollama.ai
2. **Pull a model**: `ollama pull llama2`
3. **Start Ollama server**: `ollama serve`
4. **Configure backend**: Set `OLLAMA_BASE_URL` and `OLLAMA_MODEL` in .env

## Progress Tracking

The system tracks multiple metrics:
- Quiz scores by category
- Daily study hours
- Task completion rates
- Weekly progress milestones
- Overall skill progression

## UI Components

Built with ShadCN UI components:
- Forms and inputs
- Data tables
- Charts and graphs
- Navigation and layout
- Modals and dialogs

## Testing

### Backend Testing
```bash
cd backend
python -m pytest tests/
```

### Frontend Testing
```bash
cd frontend
npm test
```

## Deployment

### Backend Deployment
1. Set production environment variables
2. Use a production WSGI server (e.g., Gunicorn)
3. Configure PostgreSQL for production database
4. Set up proper logging and monitoring

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy to Vercel, Netlify, or similar platform
3. Configure environment variables for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Contact the development team

---

Built with love using Next.js, Flask, and modern web technologies.# Programming-Learning-Path
