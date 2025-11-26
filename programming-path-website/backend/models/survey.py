import datetime
from . import db


class Survey(db.Model):
    """Survey model for storing user survey responses"""
    
    __tablename__ = 'survey'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    # Core fields
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
    
    def __repr__(self):
        return f'<Survey {self.id} - User {self.user_id}>'
