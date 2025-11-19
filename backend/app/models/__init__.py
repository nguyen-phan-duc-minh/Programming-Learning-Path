# Import all models here for easy access
from .user import User, SkillProfile
from .quiz import QuizQuestion, QuizResult
from .roadmap import RoadmapTemplate, UserRoadmap, TaskProgress
from .resource import Resource, UserProgress

__all__ = [
    'User', 'SkillProfile',
    'QuizQuestion', 'QuizResult',
    'RoadmapTemplate', 'UserRoadmap', 'TaskProgress',
    'Resource', 'UserProgress'
]