import json
from models import LearningPath, DailySchedule, db
from utils.learning_topics import get_software_topics, get_data_science_topics, get_combined_topics


class LearningPathService:
    """Service for handling learning path generation and management"""
    
    @staticmethod
    def generate_learning_path(user, survey):
        """
        Generate a 30-day learning path based on survey responses
        
        Args:
            user: User model instance
            survey: Survey model instance
            
        Returns:
            LearningPath: Generated learning path
        """
        role = survey.role
        experience = survey.experience_level
        interests = json.loads(survey.interests)
        
        # Determine learning path based on role
        if role == 'software':
            title = "30-Day Software Development Journey"
            description = "Master the fundamentals of software development with Python"
            topics = get_software_topics(experience, interests)
        elif role == 'data':
            title = "30-Day Data Science & Analytics Path"
            description = "Learn data science from basics to advanced analytics"
            topics = get_data_science_topics(experience, interests)
        else:  # both
            title = "30-Day Full Stack Developer + Data Science"
            description = "Comprehensive journey covering both software development and data science"
            topics = get_combined_topics(experience, interests)
        
        # Create learning path
        learning_path = LearningPath(
            user_id=user.id,
            title=title,
            description=description,
            duration_days=30
        )
        db.session.add(learning_path)
        db.session.flush()  # To get the ID
        
        # Create daily schedules
        for day, topic_data in enumerate(topics, 1):
            # Ensure all fields have proper defaults
            videos = topic_data.get('videos', [])
            resources = topic_data.get('resources', [])
            
            daily_schedule = DailySchedule(
                learning_path_id=learning_path.id,
                day_number=day,
                title=topic_data.get('title', f'Day {day}'),
                content=topic_data.get('content', 'Content coming soon'),
                estimated_hours=topic_data.get('hours', 1.0),
                topics=json.dumps(topic_data.get('topics', [])),
                videos=json.dumps(videos if videos else []),
                resources=json.dumps(resources if resources else [])
            )
            db.session.add(daily_schedule)
        
        db.session.commit()
        return learning_path
    
    @staticmethod
    def get_learning_path_details(path_id):
        """
        Get learning path with all daily schedules
        
        Args:
            path_id: Learning path ID
            
        Returns:
            dict: Learning path details with daily schedules
        """
        learning_path = LearningPath.query.get_or_404(path_id)
        daily_schedules = DailySchedule.query.filter_by(
            learning_path_id=path_id
        ).order_by(DailySchedule.day_number).all()
        
        return {
            'id': learning_path.id,
            'title': learning_path.title,
            'description': learning_path.description,
            'duration_days': learning_path.duration_days,
            'daily_schedules': [schedule.to_dict() for schedule in daily_schedules]
        }
