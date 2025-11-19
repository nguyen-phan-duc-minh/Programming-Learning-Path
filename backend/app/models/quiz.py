from app import db
from datetime import datetime
import json

class QuizQuestion(db.Model):
    __tablename__ = 'quiz_questions'
    
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(50), nullable=False)  # html_css_js, oop_sql, python_numpy, algorithm
    question_text = db.Column(db.Text, nullable=False)
    option_a = db.Column(db.String(255), nullable=False)
    option_b = db.Column(db.String(255), nullable=False)
    option_c = db.Column(db.String(255), nullable=False)
    option_d = db.Column(db.String(255), nullable=False)
    correct_answer = db.Column(db.String(1), nullable=False)  # A, B, C, D
    explanation = db.Column(db.Text)
    difficulty_level = db.Column(db.String(20), default='medium')  # easy, medium, hard
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self, include_answer=False):
        data = {
            'id': self.id,
            'category': self.category,
            'question_text': self.question_text,
            'option_a': self.option_a,
            'option_b': self.option_b,
            'option_c': self.option_c,
            'option_d': self.option_d,
            'difficulty_level': self.difficulty_level
        }
        if include_answer:
            data['correct_answer'] = self.correct_answer
            data['explanation'] = self.explanation
        return data

class QuizResult(db.Model):
    __tablename__ = 'quiz_results'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    total_questions = db.Column(db.Integer, nullable=False)
    correct_answers = db.Column(db.Integer, nullable=False)
    score_percentage = db.Column(db.Integer, nullable=False)
    time_taken = db.Column(db.Integer)  # in seconds
    answers = db.Column(db.Text)  # JSON string of user answers
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def calculate_score(self):
        if self.total_questions > 0:
            self.score_percentage = int((self.correct_answers / self.total_questions) * 100)
        else:
            self.score_percentage = 0
        return self.score_percentage
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'category': self.category,
            'total_questions': self.total_questions,
            'correct_answers': self.correct_answers,
            'score_percentage': self.score_percentage,
            'time_taken': self.time_taken,
            'answers': json.loads(self.answers) if self.answers else None,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }