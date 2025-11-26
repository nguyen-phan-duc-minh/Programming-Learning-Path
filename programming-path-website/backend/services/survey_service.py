import json
from models import Survey, db


class SurveyService:
    """Service for handling survey logic"""
    
    @staticmethod
    def create_survey(data):
        """
        Create a new survey from user input
        
        Args:
            data: Dictionary containing survey data
            
        Returns:
            dict: Survey creation result
        """
        # Create survey entry (temporary user_id=1 until OAuth)
        survey = Survey(
            user_id=1,  # Temporary, will be updated after OAuth
            role=data['role'],
            experience_level=data['experience_level'],
            motivation=data['motivation'],
            time_commitment=data['time_commitment'],
            devices=SurveyService._serialize_field(data['devices']),
            learning_style=data['learning_style'],
            interests=SurveyService._serialize_field(data['interests']),
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
            # Final assessment fields
            confidence_level=data['confidence_level'],
            career_impact=data['career_impact'],
            stress_level=data['stress_level'],
            uncertainty=data['uncertainty'],
            barriers=data['barriers'],
            python_benefits=data['python_benefits'],
            quick_learning=data['quick_learning'],
            self_taught=data['self_taught'],
            data_growth=data['data_growth'],
            salary_potential=data['salary_potential'],
            age_range=data['age_range']
        )
        
        db.session.add(survey)
        db.session.commit()
        
        return {
            'message': 'Survey submitted successfully',
            'survey_id': survey.id,
            'redirect_to_auth': True
        }
    
    @staticmethod
    def _serialize_field(field_value):
        """Serialize field to JSON string if it's a list"""
        if isinstance(field_value, list):
            return json.dumps(field_value)
        return field_value
