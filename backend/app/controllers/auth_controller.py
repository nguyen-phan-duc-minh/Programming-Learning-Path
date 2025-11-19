from flask import request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, get_jwt
from werkzeug.security import generate_password_hash, check_password_hash
from app import db
from app.models.user import User
from app.models.schemas import UserSchema
from datetime import datetime, timedelta
import re

class AuthController:
    
    @staticmethod
    def register():
        try:
            data = request.get_json()
            
            # Validate required fields
            required_fields = ['email', 'password', 'first_name', 'last_name']
            for field in required_fields:
                if not data.get(field):
                    return jsonify({'error': f'{field} is required'}), 400
            
            # Validate email format
            email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
            if not re.match(email_regex, data['email']):
                return jsonify({'error': 'Invalid email format'}), 400
            
            # Check if user already exists
            if User.query.filter_by(email=data['email']).first():
                return jsonify({'error': 'Email already registered'}), 409
            
            # Validate password strength
            if len(data['password']) < 6:
                return jsonify({'error': 'Password must be at least 6 characters long'}), 400
            
            # Create new user
            user = User(
                email=data['email'].lower(),
                first_name=data['first_name'],
                last_name=data['last_name']
            )
            user.set_password(data['password'])
            
            db.session.add(user)
            db.session.commit()
            
            # Generate tokens
            access_token = create_access_token(identity=str(user.id))
            refresh_token = create_refresh_token(identity=str(user.id))
            
            return jsonify({
                'message': 'User registered successfully',
                'user': user.to_dict(),
                'access_token': access_token,
                'refresh_token': refresh_token
            }), 201
            
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    
    @staticmethod
    def login():
        try:
            data = request.get_json()
            
            if not data.get('email') or not data.get('password'):
                return jsonify({'error': 'Email and password are required'}), 400
            
            user = User.query.filter_by(email=data['email'].lower()).first()
            
            if not user or not user.check_password(data['password']):
                return jsonify({'error': 'Invalid email or password'}), 401
            
            if not user.is_active:
                return jsonify({'error': 'Account is deactivated'}), 403
            
            # Create tokens
            access_token = create_access_token(identity=str(user.id))
            refresh_token = create_refresh_token(identity=str(user.id))
            
            return jsonify({
                'message': 'Login successful',
                'user': user.to_dict(),
                'access_token': access_token,
                'refresh_token': refresh_token
            }), 200
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @staticmethod
    @jwt_required(refresh=True)
    def refresh():
        try:
            current_user_id = int(get_jwt_identity())
            user = User.query.get(current_user_id)
            
            if not user or not user.is_active:
                return jsonify({'error': 'User not found or inactive'}), 404
            
            new_access_token = create_access_token(identity=current_user_id)
            
            return jsonify({
                'access_token': new_access_token
            }), 200
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @staticmethod
    @jwt_required()
    def get_current_user():
        try:
            current_user_id = int(get_jwt_identity())
            user = User.query.get(current_user_id)
            
            if not user:
                return jsonify({'error': 'User not found'}), 404
            
            return jsonify({
                'user': user.to_dict()
            }), 200
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @staticmethod
    def forgot_password():
        try:
            data = request.get_json()
            
            if not data.get('email'):
                return jsonify({'error': 'Email is required'}), 400
            
            user = User.query.filter_by(email=data['email'].lower()).first()
            
            if not user:
                # Don't reveal if email exists or not for security
                return jsonify({'message': 'If the email exists, a password reset link has been sent'}), 200
            
            # In a real app, you would send an email with a reset token
            # For now, we'll just return a success message
            # You can implement email sending with Flask-Mail later
            
            return jsonify({
                'message': 'If the email exists, a password reset link has been sent'
            }), 200
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @staticmethod
    @jwt_required()
    def change_password():
        try:
            current_user_id = int(get_jwt_identity())
            data = request.get_json()
            
            if not data.get('current_password') or not data.get('new_password'):
                return jsonify({'error': 'Current password and new password are required'}), 400
            
            user = User.query.get(current_user_id)
            
            if not user or not user.check_password(data['current_password']):
                return jsonify({'error': 'Current password is incorrect'}), 401
            
            if len(data['new_password']) < 6:
                return jsonify({'error': 'New password must be at least 6 characters long'}), 400
            
            user.set_password(data['new_password'])
            user.updated_at = datetime.utcnow()
            db.session.commit()
            
            return jsonify({
                'message': 'Password changed successfully'
            }), 200
            
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    
    @staticmethod
    @jwt_required()
    def update_profile():
        """Update user profile"""
        try:
            user_id = int(get_jwt_identity())
            user = User.query.get(user_id)
            
            if not user:
                return jsonify({'error': 'User not found'}), 404
            
            data = request.get_json()
            
            # Update allowed fields
            if 'full_name' in data:
                user.full_name = data['full_name']
            if 'bio' in data:
                user.bio = data['bio']
            if 'location' in data:
                user.location = data['location']
            if 'website' in data:
                user.website = data['website']
            if 'github' in data:
                user.github = data['github']
            if 'linkedin' in data:
                user.linkedin = data['linkedin']
            
            user.updated_at = datetime.utcnow()
            db.session.commit()
            
            return jsonify({
                'message': 'Profile updated successfully',
                'user': user.to_dict()
            })
            
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500