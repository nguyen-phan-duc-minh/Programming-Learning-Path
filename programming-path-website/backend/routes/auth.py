from flask import Blueprint, request, jsonify
from services.auth_service import AuthService

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/google', methods=['POST'])
def google_auth():
    """Handle Google OAuth authentication"""
    try:
        data = request.get_json()
        token = data.get('token')
        survey_id = data.get('survey_id')
        
        if not token:
            return jsonify({'error': 'Token is required'}), 400
        
        # Use auth service to handle authentication
        result = AuthService.authenticate_with_google(token, survey_id)
        
        return jsonify(result), 200
        
    except Exception as e:
        print(f"Authentication error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': f'Authentication failed: {str(e)}'}), 500
