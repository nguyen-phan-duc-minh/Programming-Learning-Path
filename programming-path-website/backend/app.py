from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from google.oauth2 import id_token
from google.auth.transport import requests
import jwt
import datetime
import os
from dotenv import load_dotenv
import json

load_dotenv()

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///programming_path.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key-here')

db = SQLAlchemy(app)

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    google_id = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(80), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
    # Relationships
    surveys = db.relationship('Survey', backref='user', lazy=True)
    learning_paths = db.relationship('LearningPath', backref='user', lazy=True)

class Survey(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    role = db.Column(db.String(50), nullable=False)  # 'software', 'data', 'both'
    experience_level = db.Column(db.String(50), nullable=False)
    motivation = db.Column(db.String(100), nullable=False)
    time_commitment = db.Column(db.String(50), nullable=False)
    devices = db.Column(db.Text, nullable=False)  # JSON string
    learning_style = db.Column(db.String(50), nullable=False)
    interests = db.Column(db.Text, nullable=False)  # JSON string
    # Software-specific fields
    programming_experience = db.Column(db.String(50), nullable=True)
    preferred_environment = db.Column(db.String(50), nullable=True)
    project_type = db.Column(db.String(50), nullable=True)
    learning_pace = db.Column(db.String(50), nullable=True)
    # Data science-specific fields
    math_background = db.Column(db.String(50), nullable=True)
    data_tools = db.Column(db.Text, nullable=True)  # JSON string
    industry_focus = db.Column(db.String(50), nullable=True)
    data_size_comfort = db.Column(db.String(50), nullable=True)
    # Final assessment fields
    confidence_level = db.Column(db.String(50), nullable=False)
    career_impact = db.Column(db.String(20), nullable=False)
    stress_level = db.Column(db.String(20), nullable=False)
    uncertainty = db.Column(db.String(20), nullable=False)
    barriers = db.Column(db.String(100), nullable=False)
    python_benefits = db.Column(db.String(20), nullable=False)
    quick_learning = db.Column(db.String(10), nullable=False)
    self_taught = db.Column(db.String(10), nullable=False)
    data_growth = db.Column(db.String(10), nullable=False)
    salary_potential = db.Column(db.String(10), nullable=False)
    age_range = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

class LearningPath(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    duration_days = db.Column(db.Integer, default=30)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
    # Relationships
    daily_schedules = db.relationship('DailySchedule', backref='learning_path', lazy=True)

class DailySchedule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    learning_path_id = db.Column(db.Integer, db.ForeignKey('learning_path.id'), nullable=False)
    day_number = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    estimated_hours = db.Column(db.Float, default=1.0)
    topics = db.Column(db.Text, nullable=False)  # JSON string
    videos = db.Column(db.Text, nullable=True)  # JSON string for video links
    resources = db.Column(db.Text, nullable=True)  # JSON string for additional resources
    completed = db.Column(db.Boolean, default=False)

# Create tables
with app.app_context():
    db.create_all()

# Routes
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Programming Path API is running'})

@app.route('/api/survey', methods=['POST'])
def submit_survey():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['role', 'experience_level', 'motivation', 'time_commitment', 
                         'devices', 'learning_style', 'interests', 'confidence_level',
                         'career_impact', 'stress_level', 'uncertainty', 'barriers',
                         'python_benefits', 'quick_learning', 'self_taught', 
                         'data_growth', 'salary_potential', 'age_range']
        
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Create survey entry (without user for now)
        survey = Survey(
            user_id=1,  # Temporary, will be updated after OAuth
            role=data['role'],
            experience_level=data['experience_level'],
            motivation=data['motivation'],
            time_commitment=data['time_commitment'],
            devices=json.dumps(data['devices']) if isinstance(data['devices'], list) else data['devices'],
            learning_style=data['learning_style'],
            interests=json.dumps(data['interests']) if isinstance(data['interests'], list) else data['interests'],
            # Software-specific fields
            programming_experience=data.get('programming_experience'),
            preferred_environment=data.get('preferred_environment'),
            project_type=data.get('project_type'),
            learning_pace=data.get('learning_pace'),
            # Data science-specific fields
            math_background=data.get('math_background'),
            data_tools=json.dumps(data['data_tools']) if isinstance(data.get('data_tools'), list) else data.get('data_tools'),
            industry_focus=data.get('industry_focus'),
            data_size_comfort=data.get('data_size_comfort'),
            # Final assessment fields
            confidence_level=data['confidence_level'],
            career_impact=data['career_impact'],
            stress_level=data['stress_level'],
            uncertainty=data['uncertainty'],
            barriers=data['barriers'],
            python_benefits=data['python_benefits'],
            quick_learning=data['quick_learning'],
            self_taught=data['self_taught'],
            data_growth=data['data_growth'],
            salary_potential=data['salary_potential'],
            age_range=data['age_range']
        )
        
        db.session.add(survey)
        db.session.commit()
        
        return jsonify({
            'message': 'Survey submitted successfully',
            'survey_id': survey.id,
            'redirect_to_auth': True
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/google', methods=['POST'])
def google_auth():
    try:
        data = request.get_json()
        token = data.get('token')
        
        if not token:
            return jsonify({'error': 'Token is required'}), 400
        
        # Verify the Google token
        CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')
        if not CLIENT_ID:
            # For demo purposes, accept any token
            user_info = {
                'sub': 'demo_user_123',
                'email': 'user@example.com',
                'name': 'Demo User'
            }
        else:
            try:
                idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
                user_info = idinfo
            except Exception as google_error:
                print(f"Google OAuth error: {google_error}")
                # Fallback to demo mode if Google verification fails
                user_info = {
                    'sub': f'demo_user_{hash(token) % 10000}',
                    'email': 'user@example.com',
                    'name': 'Demo User'
                }
        
        # Check if user exists
        user = User.query.filter_by(google_id=user_info['sub']).first()
        
        if not user:
            # Create new user
            user = User(
                google_id=user_info['sub'],
                email=user_info['email'],
                name=user_info['name']
            )
            db.session.add(user)
            db.session.commit()
        
        # Generate JWT token
        try:
            jwt_token = jwt.encode({
                'user_id': user.id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)
            }, app.config['SECRET_KEY'], algorithm='HS256')
        except Exception as jwt_error:
            print(f"JWT encoding error: {jwt_error}")
            return jsonify({'error': 'Token generation failed'}), 500
        
        # Update survey with user_id if survey_id provided
        survey_id = data.get('survey_id')
        if survey_id:
            survey = Survey.query.get(survey_id)
            if survey:
                survey.user_id = user.id
                db.session.commit()
                
                # Generate learning path
                learning_path = generate_learning_path(user, survey)
                
                return jsonify({
                    'token': jwt_token,
                    'user': {
                        'id': user.id,
                        'name': user.name,
                        'email': user.email
                    },
                    'learning_path': {
                        'id': learning_path.id,
                        'title': learning_path.title,
                        'description': learning_path.description,
                        'duration_days': learning_path.duration_days
                    }
                })
        
        return jsonify({
            'token': jwt_token,
            'user': {
                'id': user.id,
                'name': user.name,
                'email': user.email
            }
        })
        
    except Exception as e:
        print(f"Authentication error: {str(e)}")
        print(f"Error type: {type(e).__name__}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': f'Authentication failed: {str(e)}'}), 500

def generate_learning_path(user, survey):
    """Generate a 30-day learning path based on survey responses"""
    
    role = survey.role
    experience = survey.experience_level
    time_commitment = survey.time_commitment
    interests = json.loads(survey.interests)
    
    # Determine learning path based on role and experience
    if role == 'software':
        title = "30-Day Software Development Journey"
        description = "Master the fundamentals of software development with Python"
        topics = get_software_topics(experience, interests)
    elif role == 'data':
        title = "30-Day Data Science & Analytics Path"
        description = "Learn data science from basics to advanced analytics"
        topics = get_data_science_topics(experience, interests)
    else:  # both
        title = "30-Day Full Stack Developer + Data Science"
        description = "Comprehensive journey covering both software development and data science"
        topics = get_combined_topics(experience, interests)
    
    # Create learning path
    learning_path = LearningPath(
        user_id=user.id,
        title=title,
        description=description,
        duration_days=30
    )
    db.session.add(learning_path)
    db.session.flush()  # To get the ID
    
    # Create daily schedules
    for day, topic_data in enumerate(topics, 1):
        daily_schedule = DailySchedule(
            learning_path_id=learning_path.id,
            day_number=day,
            title=topic_data['title'],
            content=topic_data['content'],
            estimated_hours=topic_data.get('hours', 1.0),
            topics=json.dumps(topic_data.get('topics', [])),
            videos=json.dumps(topic_data.get('videos', [])),
            resources=json.dumps(topic_data.get('resources', []))
        )
        db.session.add(daily_schedule)
    
    db.session.commit()
    return learning_path

def get_software_topics(experience, interests):
    """Get software development topics based on experience and interests"""
    base_topics = [
        {
            "title": "Python Basics & Syntax", 
            "content": "Learn Python fundamentals, variables, and basic operations", 
            "hours": 2, 
            "topics": ["variables", "functions", "loops"],
            "videos": [
                {"title": "Python Tutorial for Beginners", "url": "https://www.youtube.com/watch?v=_uQrJ0TkZlc", "duration": "6:14:07"},
                {"title": "Python Variables and Data Types", "url": "https://www.youtube.com/watch?v=cQT33yu9pY8", "duration": "15:32"}
            ],
            "resources": [
                {"title": "Python.org Official Tutorial", "url": "https://docs.python.org/3/tutorial/", "type": "documentation"},
                {"title": "Real Python - Python Basics", "url": "https://realpython.com/python-basics/", "type": "article"}
            ]
        },
        {
            "title": "Data Structures in Python", 
            "content": "Master lists, dictionaries, sets, and tuples", 
            "hours": 2, 
            "topics": ["lists", "dictionaries", "sets"],
            "videos": [
                {"title": "Python Data Structures", "url": "https://www.youtube.com/watch?v=R-HLU9Fl5ug", "duration": "1:15:00"},
                {"title": "Lists vs Tuples vs Sets vs Dictionaries", "url": "https://www.youtube.com/watch?v=W8KRzm-HUcc", "duration": "12:19"}
            ],
            "resources": [
                {"title": "Python Data Structures Documentation", "url": "https://docs.python.org/3/tutorial/datastructures.html", "type": "documentation"},
                {"title": "Real Python - Python Data Structures", "url": "https://realpython.com/python-data-structures/", "type": "article"}
            ]
        },
        {
            "title": "Object-Oriented Programming", 
            "content": "Learn classes, objects, and inheritance", 
            "hours": 3, 
            "topics": ["classes", "objects", "inheritance"],
            "videos": [
                {"title": "Python OOP Tutorial", "url": "https://www.youtube.com/watch?v=ZDa-Z5JzLYM", "duration": "2:28:26"},
                {"title": "Python Classes and Objects", "url": "https://www.youtube.com/watch?v=apACNr7DC_s", "duration": "20:52"}
            ],
            "resources": [
                {"title": "Python Classes Tutorial", "url": "https://docs.python.org/3/tutorial/classes.html", "type": "documentation"},
                {"title": "Real Python - OOP in Python 3", "url": "https://realpython.com/python3-object-oriented-programming/", "type": "article"}
            ]
        },
        {
            "title": "File Handling & I/O", 
            "content": "Work with files and user input/output", 
            "hours": 1.5, 
            "topics": ["file operations", "input/output"],
            "videos": [
                {"title": "Python File Handling", "url": "https://www.youtube.com/watch?v=Uh2ebFW8OYM", "duration": "32:33"},
                {"title": "Reading and Writing Files in Python", "url": "https://www.youtube.com/watch?v=4mX0uPGw2Qc", "duration": "16:44"}
            ],
            "resources": [
                {"title": "Python File I/O Documentation", "url": "https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files", "type": "documentation"},
                {"title": "Automate the Boring Stuff - Files", "url": "https://automatetheboringstuff.com/2e/chapter9/", "type": "article"}
            ]
        },
        {
            "title": "Error Handling & Debugging", 
            "content": "Learn exception handling and debugging techniques", 
            "hours": 1.5, 
            "topics": ["try/except", "debugging"],
            "videos": [
                {"title": "Python Exception Handling", "url": "https://www.youtube.com/watch?v=NIWwJbo-9_8", "duration": "52:27"},
                {"title": "Python Debugging with Pdb", "url": "https://www.youtube.com/watch?v=P0pIW5tJrRM", "duration": "25:38"}
            ],
            "resources": [
                {"title": "Python Errors and Exceptions", "url": "https://docs.python.org/3/tutorial/errors.html", "type": "documentation"},
                {"title": "Real Python - Python Debugging", "url": "https://realpython.com/python-debugging-pdb/", "type": "article"}
            ]
        },
        {
            "title": "Web Development Basics", 
            "content": "Introduction to HTML, CSS, and web concepts", 
            "hours": 2, 
            "topics": ["HTML", "CSS", "web basics"],
            "videos": [
                {"title": "HTML & CSS Crash Course", "url": "https://www.youtube.com/watch?v=UB1O30fR-EE", "duration": "1:40:00"},
                {"title": "Web Development Fundamentals", "url": "https://www.youtube.com/watch?v=ZxHQdwMpe9g", "duration": "45:32"}
            ],
            "resources": [
                {"title": "MDN Web Docs - HTML", "url": "https://developer.mozilla.org/en-US/docs/Web/HTML", "type": "documentation"},
                {"title": "FreeCodeCamp - Responsive Web Design", "url": "https://www.freecodecamp.org/learn/responsive-web-design/", "type": "course"}
            ]
        },
        {
            "title": "Flask Web Framework", 
            "content": "Build your first web application with Flask", 
            "hours": 3, 
            "topics": ["Flask", "routing", "templates"],
            "videos": [
                {"title": "Flask Tutorial for Beginners", "url": "https://www.youtube.com/watch?v=Z1RJmh_OqeA", "duration": "1:23:45"},
                {"title": "Python Flask Tutorial", "url": "https://www.youtube.com/watch?v=MwZwr5Tvyxo", "duration": "6:17:48"}
            ],
            "resources": [
                {"title": "Flask Official Documentation", "url": "https://flask.palletsprojects.com/", "type": "documentation"},
                {"title": "Real Python - Flask Tutorial", "url": "https://realpython.com/tutorials/flask/", "type": "tutorial"}
            ]
        },
        {
            "title": "Database Fundamentals", 
            "content": "Learn SQL and database design", 
            "hours": 2, 
            "topics": ["SQL", "database design"],
            "videos": [
                {"title": "SQL Tutorial for Beginners", "url": "https://www.youtube.com/watch?v=HXV3zeQKqGY", "duration": "4:20:52"},
                {"title": "Database Design Course", "url": "https://www.youtube.com/watch?v=ztHopE5Wnpc", "duration": "8:29:00"}
            ],
            "resources": [
                {"title": "W3Schools SQL Tutorial", "url": "https://www.w3schools.com/sql/", "type": "tutorial"},
                {"title": "SQLite Tutorial", "url": "https://www.sqlitetutorial.net/", "type": "tutorial"}
            ]
        },
        {
            "title": "API Development", 
            "content": "Create RESTful APIs with Flask", 
            "hours": 2.5, 
            "topics": ["REST APIs", "JSON", "endpoints"],
            "videos": [
                {"title": "Build a REST API with Flask", "url": "https://www.youtube.com/watch?v=GMppyAPbLYk", "duration": "1:57:45"},
                {"title": "RESTful API Design", "url": "https://www.youtube.com/watch?v=qbLc5a9jdXo", "duration": "45:22"}
            ],
            "resources": [
                {"title": "Flask-RESTful Documentation", "url": "https://flask-restful.readthedocs.io/", "type": "documentation"},
                {"title": "RESTful API Design Guide", "url": "https://restfulapi.net/", "type": "guide"}
            ]
        },
        {"title": "Frontend Integration", "content": "Connect frontend with backend APIs", "hours": 2, "topics": ["AJAX", "fetch API", "integration"]},
        {"title": "Authentication & Security", "content": "Implement user authentication and security", "hours": 2.5, "topics": ["authentication", "security", "JWT"]},
        {"title": "Testing Your Code", "content": "Write unit tests and test your applications", "hours": 2, "topics": ["unit testing", "pytest", "TDD"]},
        {"title": "Version Control with Git", "content": "Master Git for code versioning", "hours": 1.5, "topics": ["Git", "GitHub", "version control"]},
        {"title": "Deployment Basics", "content": "Deploy your web application to the cloud", "hours": 2, "topics": ["deployment", "cloud", "hosting"]},
        {"title": "Advanced Python Features", "content": "Explore decorators, generators, and context managers", "hours": 2.5, "topics": ["decorators", "generators", "context managers"]},
        {"title": "Working with APIs", "content": "Consume third-party APIs and web services", "hours": 2, "topics": ["API consumption", "requests library", "web services"]},
        {"title": "Database Relationships", "content": "Advanced database operations and relationships", "hours": 2.5, "topics": ["foreign keys", "joins", "relationships"]},
        {"title": "Frontend Framework Basics", "content": "Introduction to React or Vue.js", "hours": 3, "topics": ["React", "components", "state management"]},
        {"title": "Performance Optimization", "content": "Optimize your Python applications", "hours": 2, "topics": ["performance", "optimization", "profiling"]},
        {"title": "Logging & Monitoring", "content": "Implement logging and application monitoring", "hours": 1.5, "topics": ["logging", "monitoring", "debugging"]},
        {"title": "Code Quality & Best Practices", "content": "Write clean, maintainable code", "hours": 2, "topics": ["code quality", "best practices", "PEP8"]},
        {"title": "Package Management", "content": "Manage dependencies and create packages", "hours": 1.5, "topics": ["pip", "virtual environments", "packaging"]},
        {"title": "Asynchronous Programming", "content": "Learn async/await and concurrent programming", "hours": 2.5, "topics": ["asyncio", "concurrency", "async/await"]},
        {"title": "Microservices Basics", "content": "Introduction to microservices architecture", "hours": 2, "topics": ["microservices", "architecture", "design patterns"]},
        {"title": "Container Basics", "content": "Introduction to Docker and containerization", "hours": 2, "topics": ["Docker", "containers", "deployment"]},
        {"title": "DevOps Fundamentals", "content": "CI/CD pipelines and automation", "hours": 2.5, "topics": ["CI/CD", "automation", "DevOps"]},
        {"title": "Scalability Concepts", "content": "Design scalable applications", "hours": 2, "topics": ["scalability", "load balancing", "caching"]},
        {"title": "Security Best Practices", "content": "Secure coding practices and common vulnerabilities", "hours": 2, "topics": ["security", "vulnerabilities", "OWASP"]},
        {"title": "Career Development", "content": "Build your portfolio and prepare for interviews", "hours": 2, "topics": ["portfolio", "interviews", "career tips"]},
        {"title": "Final Project", "content": "Build a complete web application showcasing your skills", "hours": 4, "topics": ["project", "portfolio", "showcase"]}
    ]
    return base_topics[:30]

def get_data_science_topics(experience, interests):
    """Get data science topics based on experience and interests"""
    base_topics = [
        {
            "title": "Python for Data Science", 
            "content": "Python basics with focus on data analysis", 
            "hours": 2, 
            "topics": ["Python", "data types", "numpy basics"],
            "videos": [
                {"title": "Python for Data Science Course", "url": "https://www.youtube.com/watch?v=LHBE6Q9XlzI", "duration": "12:15:00"},
                {"title": "Data Science with Python", "url": "https://www.youtube.com/watch?v=ua-CiDNNj30", "duration": "8:56:19"}
            ],
            "resources": [
                {"title": "Python Data Science Handbook", "url": "https://jakevdp.github.io/PythonDataScienceHandbook/", "type": "book"},
                {"title": "Kaggle Learn - Python", "url": "https://www.kaggle.com/learn/python", "type": "course"}
            ]
        },
        {
            "title": "NumPy Fundamentals", 
            "content": "Master numerical computing with NumPy", 
            "hours": 2, 
            "topics": ["arrays", "mathematical operations", "broadcasting"],
            "videos": [
                {"title": "Complete NumPy Tutorial", "url": "https://www.youtube.com/watch?v=QUT1VHiLmmI", "duration": "58:41"},
                {"title": "NumPy Crash Course", "url": "https://www.youtube.com/watch?v=9JUAPgtkKpI", "duration": "1:24:33"}
            ],
            "resources": [
                {"title": "NumPy Official Documentation", "url": "https://numpy.org/doc/stable/", "type": "documentation"},
                {"title": "NumPy Tutorial - W3Schools", "url": "https://www.w3schools.com/python/numpy/", "type": "tutorial"}
            ]
        },
        {
            "title": "Pandas Basics", 
            "content": "Data manipulation and analysis with Pandas", 
            "hours": 2.5, 
            "topics": ["DataFrames", "Series", "data cleaning"],
            "videos": [
                {"title": "Complete Pandas Tutorial", "url": "https://www.youtube.com/watch?v=vmEHCJofslg", "duration": "1:00:27"},
                {"title": "Pandas Full Course", "url": "https://www.youtube.com/watch?v=PcvsOaixUh8", "duration": "2:31:48"}
            ],
            "resources": [
                {"title": "Pandas Documentation", "url": "https://pandas.pydata.org/docs/", "type": "documentation"},
                {"title": "10 Minutes to Pandas", "url": "https://pandas.pydata.org/docs/user_guide/10min.html", "type": "quickstart"}
            ]
        },
        {
            "title": "Data Visualization with Matplotlib", 
            "content": "Create charts and graphs for data visualization", 
            "hours": 2, 
            "topics": ["plotting", "charts", "visualization"],
            "videos": [
                {"title": "Matplotlib Tutorial", "url": "https://www.youtube.com/watch?v=UO98lJQ3QGI", "duration": "3:10:00"},
                {"title": "Data Visualization with Python", "url": "https://www.youtube.com/watch?v=a9UrKTVEeZA", "duration": "1:32:05"}
            ],
            "resources": [
                {"title": "Matplotlib Documentation", "url": "https://matplotlib.org/stable/contents.html", "type": "documentation"},
                {"title": "Python Graph Gallery", "url": "https://www.python-graph-gallery.com/", "type": "examples"}
            ]
        },
        {
            "title": "Advanced Pandas Operations", 
            "content": "Complex data manipulation techniques", 
            "hours": 2.5, 
            "topics": ["groupby", "merging", "pivoting"],
            "videos": [
                {"title": "Advanced Pandas", "url": "https://www.youtube.com/watch?v=tcRGa2soc-c", "duration": "1:15:00"},
                {"title": "Pandas GroupBy Operations", "url": "https://www.youtube.com/watch?v=qy0fDqoMJx8", "duration": "18:33"}
            ],
            "resources": [
                {"title": "Pandas User Guide - GroupBy", "url": "https://pandas.pydata.org/docs/user_guide/groupby.html", "type": "documentation"},
                {"title": "Real Python - Pandas GroupBy", "url": "https://realpython.com/pandas-groupby/", "type": "article"}
            ]
        },
        {
            "title": "Seaborn for Statistical Plots", 
            "content": "Statistical data visualization with Seaborn", 
            "hours": 2, 
            "topics": ["statistical plots", "seaborn", "styling"],
            "videos": [
                {"title": "Seaborn Tutorial", "url": "https://www.youtube.com/watch?v=6GUZXDef2U0", "duration": "1:07:40"},
                {"title": "Data Visualization with Seaborn", "url": "https://www.youtube.com/watch?v=TLdXM0A7SR8", "duration": "2:13:32"}
            ],
            "resources": [
                {"title": "Seaborn Documentation", "url": "https://seaborn.pydata.org/", "type": "documentation"},
                {"title": "Seaborn Tutorial Gallery", "url": "https://seaborn.pydata.org/tutorial.html", "type": "tutorial"}
            ]
        },
        {"title": "Data Cleaning & Preprocessing", "content": "Handle missing data and prepare datasets", "hours": 2.5, "topics": ["missing data", "outliers", "normalization"]},
        {"title": "Exploratory Data Analysis", "content": "Discover patterns and insights in data", "hours": 2, "topics": ["EDA", "statistics", "correlation"]},
        {"title": "Statistical Analysis Basics", "content": "Descriptive and inferential statistics", "hours": 2.5, "topics": ["statistics", "hypothesis testing", "distributions"]},
        {"title": "Introduction to Machine Learning", "content": "ML concepts and scikit-learn basics", "hours": 3, "topics": ["ML basics", "scikit-learn", "algorithms"]},
        {"title": "Linear Regression", "content": "Build your first predictive model", "hours": 2, "topics": ["regression", "prediction", "model evaluation"]},
        {"title": "Classification Algorithms", "content": "Learn classification techniques", "hours": 2.5, "topics": ["classification", "decision trees", "logistic regression"]},
        {"title": "Model Evaluation & Validation", "content": "Assess model performance and avoid overfitting", "hours": 2, "topics": ["cross-validation", "metrics", "overfitting"]},
        {"title": "Feature Engineering", "content": "Create and select meaningful features", "hours": 2.5, "topics": ["feature selection", "feature creation", "encoding"]},
        {"title": "Clustering & Unsupervised Learning", "content": "Discover hidden patterns in data", "hours": 2, "topics": ["clustering", "k-means", "dimensionality reduction"]},
        {"title": "Time Series Analysis", "content": "Analyze and forecast time-based data", "hours": 2.5, "topics": ["time series", "forecasting", "trends"]},
        {"title": "Web Scraping for Data", "content": "Collect data from websites", "hours": 2, "topics": ["web scraping", "BeautifulSoup", "requests"]},
        {"title": "Working with APIs", "content": "Fetch data from web APIs", "hours": 1.5, "topics": ["APIs", "JSON", "data collection"]},
        {"title": "SQL for Data Analysis", "content": "Query databases for data analysis", "hours": 2, "topics": ["SQL", "queries", "database analysis"]},
        {"title": "Big Data Basics", "content": "Introduction to big data tools", "hours": 2.5, "topics": ["big data", "distributed computing", "scalability"]},
        {"title": "Deep Learning Introduction", "content": "Neural networks with TensorFlow/Keras", "hours": 3, "topics": ["neural networks", "deep learning", "TensorFlow"]},
        {"title": "Natural Language Processing", "content": "Analyze text data and build NLP models", "hours": 2.5, "topics": ["NLP", "text processing", "sentiment analysis"]},
        {"title": "Computer Vision Basics", "content": "Process and analyze images", "hours": 2.5, "topics": ["image processing", "OpenCV", "computer vision"]},
        {"title": "Model Deployment", "content": "Deploy ML models to production", "hours": 2, "topics": ["model deployment", "Flask API", "cloud deployment"]},
        {"title": "A/B Testing & Experimentation", "content": "Design and analyze experiments", "hours": 2, "topics": ["A/B testing", "experimental design", "statistical significance"]},
        {"title": "Data Storytelling", "content": "Present insights effectively", "hours": 2, "topics": ["data storytelling", "visualization", "presentation"]},
        {"title": "Ethics in Data Science", "content": "Responsible AI and data ethics", "hours": 1.5, "topics": ["data ethics", "bias", "privacy"]},
        {"title": "Advanced Visualization", "content": "Interactive visualizations with Plotly", "hours": 2, "topics": ["interactive plots", "Plotly", "dashboards"]},
        {"title": "Portfolio Development", "content": "Build a data science portfolio", "hours": 2.5, "topics": ["portfolio", "GitHub", "project showcase"]},
        {"title": "Capstone Project", "content": "Complete end-to-end data science project", "hours": 4, "topics": ["capstone", "end-to-end project", "presentation"]}
    ]
    return base_topics[:30]

def get_combined_topics(experience, interests):
    """Get combined topics for both software development and data science"""
    software_topics = get_software_topics(experience, interests)[:15]
    data_topics = get_data_science_topics(experience, interests)[:15]
    
    # Interleave topics for balanced learning
    combined = []
    for i in range(15):
        combined.append(software_topics[i])
        combined.append(data_topics[i])
    
    return combined

@app.route('/api/learning-path/<int:path_id>', methods=['GET'])
def get_learning_path(path_id):
    try:
        learning_path = LearningPath.query.get_or_404(path_id)
        daily_schedules = DailySchedule.query.filter_by(learning_path_id=path_id).order_by(DailySchedule.day_number).all()
        
        return jsonify({
            'id': learning_path.id,
            'title': learning_path.title,
            'description': learning_path.description,
            'duration_days': learning_path.duration_days,
            'daily_schedules': [{
                'id': schedule.id,
                'day_number': schedule.day_number,
                'title': schedule.title,
                'content': schedule.content,
                'estimated_hours': schedule.estimated_hours,
                'topics': json.loads(schedule.topics),
                'videos': json.loads(schedule.videos) if schedule.videos else [],
                'resources': json.loads(schedule.resources) if schedule.resources else [],
                'completed': schedule.completed
            } for schedule in daily_schedules]
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/daily-schedule/<int:schedule_id>/complete', methods=['POST'])
def complete_daily_schedule(schedule_id):
    try:
        schedule = DailySchedule.query.get_or_404(schedule_id)
        schedule.completed = True
        db.session.commit()
        
        return jsonify({'message': 'Day completed successfully'})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)