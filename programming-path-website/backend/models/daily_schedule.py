import json
from . import db


class DailySchedule(db.Model):
    """Daily schedule model for storing daily learning tasks"""
    
    __tablename__ = 'daily_schedule'
    
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
    
    def to_dict(self):
        """Convert daily schedule to dictionary"""
        return {
            'id': self.id,
            'day_number': self.day_number,
            'title': self.title,
            'content': self.content,
            'estimated_hours': self.estimated_hours,
            'topics': json.loads(self.topics) if self.topics else [],
            'videos': json.loads(self.videos) if self.videos else [],
            'resources': json.loads(self.resources) if self.resources else [],
            'completed': self.completed
        }
    
    def __repr__(self):
        return f'<DailySchedule Day {self.day_number} - {self.title}>'
