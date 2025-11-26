from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .user import User
from .survey import Survey
from .learning_path import LearningPath
from .daily_schedule import DailySchedule

__all__ = ['db', 'User', 'Survey', 'LearningPath', 'DailySchedule']
