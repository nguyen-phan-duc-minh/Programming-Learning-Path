from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import json

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    role = db.Column(db.String(20), default='user')  # 'user' or 'admin'
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    skill_profile = db.relationship('SkillProfile', backref='user', uselist=False, cascade='all, delete-orphan')
    quiz_results = db.relationship('QuizResult', backref='user', cascade='all, delete-orphan')
    user_roadmaps = db.relationship('UserRoadmap', backref='user', cascade='all, delete-orphan')
    task_progress = db.relationship('TaskProgress', backref='user', cascade='all, delete-orphan')
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'role': self.role,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class SkillProfile(db.Model):
    __tablename__ = 'skill_profiles'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    career_goal = db.Column(db.String(100), nullable=False)  # AI Engineer, Frontend, Backend, etc.
    current_level = db.Column(db.String(20), nullable=False)  # Beginner, Intermediate, Advanced
    math_algorithm_level = db.Column(db.Integer, default=1)  # 1-5 scale
    daily_study_hours = db.Column(db.Integer, default=1)  # hours per day
    computer_specs = db.Column(db.Text)  # JSON string
    programming_experience = db.Column(db.Text)  # Previous experience description
    
    # Quiz scores
    html_css_js_score = db.Column(db.Integer, default=0)
    oop_sql_score = db.Column(db.Integer, default=0)
    python_numpy_score = db.Column(db.Integer, default=0)
    algorithm_score = db.Column(db.Integer, default=0)
    
    # Overall assessment
    overall_score = db.Column(db.Integer, default=0)
    recommended_path = db.Column(db.String(100))
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def calculate_overall_score(self):
        total = self.html_css_js_score + self.oop_sql_score + self.python_numpy_score + self.algorithm_score
        self.overall_score = total
        return total
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'career_goal': self.career_goal,
            'current_level': self.current_level,
            'math_algorithm_level': self.math_algorithm_level,
            'daily_study_hours': self.daily_study_hours,
            'computer_specs': json.loads(self.computer_specs) if self.computer_specs else None,
            'programming_experience': self.programming_experience,
            'html_css_js_score': self.html_css_js_score,
            'oop_sql_score': self.oop_sql_score,
            'python_numpy_score': self.python_numpy_score,
            'algorithm_score': self.algorithm_score,
            'overall_score': self.overall_score,
            'recommended_path': self.recommended_path,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }