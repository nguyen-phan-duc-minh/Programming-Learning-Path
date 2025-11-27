from flask import Blueprint, request, jsonify
from services.auth_service import AuthService
from models import User

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


@auth_bp.route('/me', methods=['GET'])
def get_current_user():
    """Get current user information from JWT token"""
    try:
        # Get token from Authorization header
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Missing or invalid authorization header'}), 401
        
        token = auth_header.replace('Bearer ', '')
        
        # Verify token and get user_id
        payload = AuthService.verify_token(token)
        user_id = payload.get('user_id')
        
        if not user_id:
            return jsonify({'error': 'Invalid token payload'}), 401
        
        # Get user from database
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify(user.to_dict()), 200
        
    except Exception as e:
        print(f"Get user error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 401
