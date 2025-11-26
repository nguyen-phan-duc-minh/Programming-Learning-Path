import datetime
from . import db


class LearningPath(db.Model):
    """Learning path model for storing user's personalized learning journey"""
    
    __tablename__ = 'learning_path'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    duration_days = db.Column(db.Integer, default=30)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
    # Relationships
    daily_schedules = db.relationship('DailySchedule', backref='learning_path', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        """Convert learning path to dictionary"""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'duration_days': self.duration_days,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<LearningPath {self.id} - {self.title}>'
