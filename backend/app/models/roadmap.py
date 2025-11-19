from app import db
from datetime import datetime
import json

class RoadmapTemplate(db.Model):
    __tablename__ = 'roadmap_templates'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    career_path = db.Column(db.String(50), nullable=False)  # frontend, backend, ai_engineer, etc.
    level_requirement = db.Column(db.String(20), nullable=False)  # beginner, intermediate, advanced
    duration_weeks = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text)
    weekly_plan = db.Column(db.Text, nullable=False)  # JSON string
    skills_covered = db.Column(db.Text)  # JSON array
    prerequisites = db.Column(db.Text)  # JSON array
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'career_path': self.career_path,
            'level_requirement': self.level_requirement,
            'duration_weeks': self.duration_weeks,
            'description': self.description,
            'weekly_plan': json.loads(self.weekly_plan) if self.weekly_plan else None,
            'skills_covered': json.loads(self.skills_covered) if self.skills_covered else [],
            'prerequisites': json.loads(self.prerequisites) if self.prerequisites else [],
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class UserRoadmap(db.Model):
    __tablename__ = 'user_roadmaps'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    template_id = db.Column(db.Integer, db.ForeignKey('roadmap_templates.id'), nullable=True)
    title = db.Column(db.String(200), nullable=False)
    personalized_plan = db.Column(db.Text, nullable=False)  # JSON string
    current_week = db.Column(db.Integer, default=1)
    progress_percentage = db.Column(db.Integer, default=0)
    is_active = db.Column(db.Boolean, default=True)
    started_at = db.Column(db.DateTime, default=datetime.utcnow)
    completed_at = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    template = db.relationship('RoadmapTemplate', backref='user_roadmaps')
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'template_id': self.template_id,
            'title': self.title,
            'personalized_plan': json.loads(self.personalized_plan) if self.personalized_plan else None,
            'current_week': self.current_week,
            'progress_percentage': self.progress_percentage,
            'is_active': self.is_active,
            'started_at': self.started_at.isoformat() if self.started_at else None,
            'completed_at': self.completed_at.isoformat() if self.completed_at else None,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class TaskProgress(db.Model):
    __tablename__ = 'task_progress'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    roadmap_id = db.Column(db.Integer, db.ForeignKey('user_roadmaps.id'), nullable=False)
    task_type = db.Column(db.String(50), nullable=False)  # daily_task, weekly_goal, milestone
    task_name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    week_number = db.Column(db.Integer, nullable=False)
    day_number = db.Column(db.Integer)
    is_completed = db.Column(db.Boolean, default=False)
    completed_at = db.Column(db.DateTime)
    due_date = db.Column(db.Date)
    study_hours = db.Column(db.Float, default=0.0)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    roadmap = db.relationship('UserRoadmap', backref='task_progress')
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'roadmap_id': self.roadmap_id,
            'task_type': self.task_type,
            'task_name': self.task_name,
            'description': self.description,
            'week_number': self.week_number,
            'day_number': self.day_number,
            'is_completed': self.is_completed,
            'completed_at': self.completed_at.isoformat() if self.completed_at else None,
            'due_date': self.due_date.isoformat() if self.due_date else None,
            'study_hours': self.study_hours,
            'notes': self.notes,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }