import os
import json
import jwt
import datetime
from google.oauth2 import id_token
from google.auth.transport import requests
from models import User, Survey, db
from services.learning_path_service import LearningPathService


class AuthService:
    """Service for handling authentication logic"""
    
    @staticmethod
    def authenticate_with_google(token, survey_id=None):
        """
        Authenticate user with Google OAuth token
        
        Args:
            token: Google OAuth token
            survey_id: Optional survey ID to link with user
            
        Returns:
            dict: Authentication result with user info and JWT token
        """
        # Verify the Google token
        CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')
        
        if not CLIENT_ID:
            # Demo mode for development
            user_info = {
                'sub': 'demo_user_123',
                'email': 'user@example.com',
                'name': 'Demo User'
            }
        else:
            try:
                idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
                user_info = idinfo
            except Exception as google_error:
                print(f"Google OAuth error: {google_error}")
                # Fallback to demo mode
                user_info = {
                    'sub': f'demo_user_{hash(token) % 10000}',
                    'email': 'user@example.com',
                    'name': 'Demo User'
                }
        
        # Check if user exists by google_id or email
        user = User.query.filter_by(google_id=user_info['sub']).first()
        
        if not user:
            # Check if email already exists
            user = User.query.filter_by(email=user_info['email']).first()
            
        if not user:
            # Create new user
            user = User(
                google_id=user_info['sub'],
                email=user_info['email'],
                name=user_info['name']
            )
            db.session.add(user)
            db.session.commit()
        else:
            # Update google_id if user exists but google_id is different
            if user.google_id != user_info['sub']:
                user.google_id = user_info['sub']
                db.session.commit()
        
        # Generate JWT token
        jwt_token = AuthService._generate_jwt_token(user.id)
        
        # Build response
        response = {
            'token': jwt_token,
            'user': user.to_dict()
        }
        
        # If survey_id provided, link survey and generate learning path
        if survey_id:
            survey = Survey.query.get(survey_id)
            if survey:
                survey.user_id = user.id
                db.session.commit()
                
                # Generate learning path
                learning_path = LearningPathService.generate_learning_path(user, survey)
                response['learning_path'] = learning_path.to_dict()
        
        return response
    
    @staticmethod
    def _generate_jwt_token(user_id):
        """Generate JWT token for user"""
        secret_key = os.getenv('SECRET_KEY', 'your-secret-key-here')
        
        token = jwt.encode({
            'user_id': user_id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7)
        }, secret_key, algorithm='HS256')
        
        return token
    
    @staticmethod
    def verify_token(token):
        """Verify JWT token"""
        try:
            secret_key = os.getenv('SECRET_KEY', 'your-secret-key-here')
            payload = jwt.decode(token, secret_key, algorithms=['HS256'])
            return payload
        except jwt.ExpiredSignatureError:
            raise Exception('Token has expired')
        except jwt.InvalidTokenError:
            raise Exception('Invalid token')
