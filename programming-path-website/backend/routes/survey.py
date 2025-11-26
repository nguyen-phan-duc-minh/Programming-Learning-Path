from flask import Blueprint, request, jsonify
from services.survey_service import SurveyService

survey_bp = Blueprint('survey', __name__)


@survey_bp.route('/survey', methods=['POST'])
def submit_survey():
    """Submit user survey"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = [
            'role', 'experience_level', 'motivation', 'time_commitment', 
            'devices', 'learning_style', 'interests', 'confidence_level',
            'career_impact', 'stress_level', 'uncertainty', 'barriers',
            'python_benefits', 'quick_learning', 'self_taught', 
            'data_growth', 'salary_potential', 'age_range'
        ]
        
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Use survey service to create survey
        result = SurveyService.create_survey(data)
        
        return jsonify(result), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@survey_bp.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy', 
        'message': 'Programming Path API is running'
    })
