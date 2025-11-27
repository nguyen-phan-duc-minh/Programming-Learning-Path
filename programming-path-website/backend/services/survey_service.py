import json
from models import Survey, User, db
from services.learning_path_service import LearningPathService


class SurveyService:
    """Service for handling survey logic"""
    
    @staticmethod
    def create_survey(data):
        """
        Create a new survey from user input and generate learning path
        
        Args:
            data: Dictionary containing survey data
            
        Returns:
            dict: Survey creation result with learning path
        """
        # Get or create temporary user
        email = data.get('email', 'temp@example.com')
        user = User.query.filter_by(email=email).first()
        if not user:
            user = User(email=email, name=data.get('name', 'Guest User'))
            db.session.add(user)
            db.session.flush()
        
        # Create survey entry with safe defaults
        survey = Survey(
            user_id=user.id,
            role=data.get('role', 'software'),
            experience_level=data.get('experience_level', 'beginner'),
            motivation=data.get('motivation', 'career'),
            time_commitment=data.get('time_commitment', '1-2'),
            devices=SurveyService._serialize_field(data.get('devices', ['laptop'])),
            learning_style=data.get('learning_style', 'structured'),
            interests=SurveyService._serialize_field(data.get('interests', ['python'])),
            # Software-specific fields
            programming_experience=data.get('programming_experience'),
            preferred_environment=data.get('preferred_environment'),
            project_type=data.get('project_type'),
            learning_pace=data.get('learning_pace'),
            # Data science-specific fields
            math_background=data.get('math_background'),
            data_tools=SurveyService._serialize_field(data.get('data_tools')),
            industry_focus=data.get('industry_focus'),
            data_size_comfort=data.get('data_size_comfort'),
            # Final assessment fields with defaults
            confidence_level=data.get('confidence_level', 'moderate'),
            career_impact=data.get('career_impact', 'high'),
            stress_level=data.get('stress_level', 'moderate'),
            uncertainty=data.get('uncertainty', 'moderate'),
            barriers=data.get('barriers', 'time'),
            python_benefits=data.get('python_benefits', 'yes'),
            quick_learning=data.get('quick_learning', 'yes'),
            self_taught=data.get('self_taught', 'yes'),
            data_growth=data.get('data_growth', 'yes'),
            salary_potential=data.get('salary_potential', 'yes'),
            age_range=data.get('age_range', '25-34')
        )
        
        db.session.add(survey)
        db.session.flush()
        
        # Generate learning path
        learning_path = LearningPathService.generate_learning_path(user, survey)
        
        db.session.commit()
        
        # Get full learning path details
        learning_path_details = LearningPathService.get_learning_path_details(learning_path.id)
        
        return {
            'message': 'Survey submitted successfully',
            'survey_id': survey.id,
            'user_id': user.id,
            'learning_path': learning_path_details
        }
    
    @staticmethod
    def _serialize_field(field_value):
        """Serialize field to JSON string if it's a list"""
        if isinstance(field_value, list):
            return json.dumps(field_value)
        return field_value
