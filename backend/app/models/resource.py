from app import db
from datetime import datetime
import json

class Resource(db.Model):
    __tablename__ = 'resources'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    resource_type = db.Column(db.String(50), nullable=False)  # video, article, course, book, exercise, leetcode
    url = db.Column(db.String(500))
    skill_category = db.Column(db.String(100), nullable=False)  # html_css, javascript, python, react, etc.
    difficulty_level = db.Column(db.String(20), nullable=False)  # beginner, intermediate, advanced
    estimated_hours = db.Column(db.Integer)
    is_free = db.Column(db.Boolean, default=True)
    rating = db.Column(db.Float)
    tags = db.Column(db.Text)  # JSON array
    thumbnail_url = db.Column(db.String(500))
    author = db.Column(db.String(100))
    platform = db.Column(db.String(50))  # youtube, udemy, coursera, etc.
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'resource_type': self.resource_type,
            'url': self.url,
            'skill_category': self.skill_category,
            'difficulty_level': self.difficulty_level,
            'estimated_hours': self.estimated_hours,
            'is_free': self.is_free,
            'rating': self.rating,
            'tags': json.loads(self.tags) if self.tags else [],
            'thumbnail_url': self.thumbnail_url,
            'author': self.author,
            'platform': self.platform,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class UserProgress(db.Model):
    __tablename__ = 'user_progress'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    resource_id = db.Column(db.Integer, db.ForeignKey('resources.id'), nullable=False)
    progress_percentage = db.Column(db.Integer, default=0)
    time_spent = db.Column(db.Integer, default=0)  # in minutes
    is_completed = db.Column(db.Boolean, default=False)
    rating = db.Column(db.Integer)  # 1-5 stars
    notes = db.Column(db.Text)
    started_at = db.Column(db.DateTime, default=datetime.utcnow)
    completed_at = db.Column(db.DateTime)
    
    # Relationships
    resource = db.relationship('Resource', backref='user_progress')
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'resource_id': self.resource_id,
            'progress_percentage': self.progress_percentage,
            'time_spent': self.time_spent,
            'is_completed': self.is_completed,
            'rating': self.rating,
            'notes': self.notes,
            'started_at': self.started_at.isoformat() if self.started_at else None,
            'completed_at': self.completed_at.isoformat() if self.completed_at else None,
            'resource': self.resource.to_dict() if self.resource else None
        }