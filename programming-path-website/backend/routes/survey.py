from flask import Blueprint, request, jsonify
from services.survey_service import SurveyService

survey_bp = Blueprint('survey', __name__)


@survey_bp.route('/survey', methods=['POST'])
def submit_survey():
    """Submit user survey"""
    try:
        data = request.get_json()
        
        # Basic validation - only check for absolutely required fields
        required_fields = ['role', 'experience_level']
        
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Use survey service to create survey
        result = SurveyService.create_survey(data)
        
        return jsonify(result), 201
        
    except Exception as e:
        print(f"Error in submit_survey: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500


@survey_bp.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy', 
        'message': 'Programming Path API is running'
    })
