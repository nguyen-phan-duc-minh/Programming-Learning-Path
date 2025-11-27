import datetime
from . import db


class User(db.Model):
    """User model for storing user authentication and profile information"""
    
    __tablename__ = 'user'
    
    id = db.Column(db.Integer, primary_key=True)
    google_id = db.Column(db.String(100), unique=True, nullable=True)  # Allow null for guest users
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(80), nullable=False)
    picture = db.Column(db.String(500), nullable=True)  # Avatar/profile picture URL
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    
    # Relationships
    surveys = db.relationship('Survey', backref='user', lazy=True, cascade='all, delete-orphan')
    learning_paths = db.relationship('LearningPath', backref='user', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        """Convert user to dictionary"""
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'picture': self.picture,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<User {self.email}>'
