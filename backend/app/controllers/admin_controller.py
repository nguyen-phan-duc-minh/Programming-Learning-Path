from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.user import User, SkillProfile
from app.models.quiz import QuizQuestion, QuizResult
from app.models.roadmap import RoadmapTemplate, UserRoadmap, TaskProgress
from app.models.resource import Resource, UserProgress
from datetime import datetime
import json

def admin_required(f):
    """Decorator to check if user is admin"""
    @jwt_required()
    def decorated_function(*args, **kwargs):
        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)
        
        if not user or user.role != 'admin':
            return jsonify({'error': 'Admin access required'}), 403
        
        return f(*args, **kwargs)
    return decorated_function

class AdminController:
    
    # User Management
    @staticmethod
    @admin_required
    def get_all_users():
        try:
            page = request.args.get('page', 1, type=int)
            per_page = request.args.get('per_page', 20, type=int)
            search = request.args.get('search', '')
            
            query = User.query
            
            if search:
                query = query.filter(
                    User.email.ilike(f'%{search}%') |
                    User.first_name.ilike(f'%{search}%') |
                    User.last_name.ilike(f'%{search}%')
                )
            
            users = query.paginate(page=page, per_page=per_page, error_out=False)
            
            return jsonify({
                'users': [user.to_dict() for user in users.items],
                'pagination': {
                    'page': page,
                    'pages': users.pages,
                    'per_page': per_page,
                    'total': users.total
                }
            }), 200
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @staticmethod
    @admin_required
    def get_user_details(user_id):
        try:
            user = User.query.get(user_id)
            if not user:
                return jsonify({'error': 'User not found'}), 404
            
            skill_profile = SkillProfile.query.filter_by(user_id=user_id).first()
            quiz_results = QuizResult.query.filter_by(user_id=user_id).all()
            user_roadmaps = UserRoadmap.query.filter_by(user_id=user_id).all()
            
            return jsonify({
                'user': user.to_dict(),
                'skill_profile': skill_profile.to_dict() if skill_profile else None,
                'quiz_results': [result.to_dict() for result in quiz_results],
                'roadmaps': [roadmap.to_dict() for roadmap in user_roadmaps]
            }), 200
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @staticmethod
    @admin_required
    def update_user(user_id):
        try:
            user = User.query.get(user_id)
            if not user:
                return jsonify({'error': 'User not found'}), 404
            
            data = request.get_json()
            
            if 'email' in data:
                user.email = data['email']
            if 'first_name' in data:
                user.first_name = data['first_name']
            if 'last_name' in data:
                user.last_name = data['last_name']
            if 'role' in data:
                user.role = data['role']
            if 'is_active' in data:
                user.is_active = data['is_active']
            
            user.updated_at = datetime.utcnow()
            db.session.commit()
            
            return jsonify({
                'message': 'User updated successfully',
                'user': user.to_dict()
            }), 200
            
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    
    @staticmethod
    @admin_required
    def delete_user(user_id):
        try:
            current_user_id = int(get_jwt_identity())
            
            if current_user_id == user_id:
                return jsonify({'error': 'Cannot delete your own account'}), 400
            
            user = User.query.get(user_id)
            if not user:
                return jsonify({'error': 'User not found'}), 404
            
            db.session.delete(user)
            db.session.commit()
            
            return jsonify({'message': 'User deleted successfully'}), 200
            
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    
    # Quiz Management
    @staticmethod
    @admin_required
    def get_quiz_questions():
        try:
            category = request.args.get('category', '')
            page = request.args.get('page', 1, type=int)
            per_page = request.args.get('per_page', 20, type=int)
            
            query = QuizQuestion.query
            
            if category:
                query = query.filter_by(category=category)
            
            questions = query.paginate(page=page, per_page=per_page, error_out=False)
            
            return jsonify({
                'questions': [q.to_dict(include_answer=True) for q in questions.items],
                'pagination': {
                    'page': page,
                    'pages': questions.pages,
                    'per_page': per_page,
                    'total': questions.total
                }
            }), 200
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @staticmethod
    @admin_required
    def create_quiz_question():
        try:
            data = request.get_json()
            
            required_fields = ['category', 'question_text', 'option_a', 'option_b', 
                             'option_c', 'option_d', 'correct_answer']
            
            for field in required_fields:
                if not data.get(field):
                    return jsonify({'error': f'{field} is required'}), 400
            
            question = QuizQuestion(
                category=data['category'],
                question_text=data['question_text'],
                option_a=data['option_a'],
                option_b=data['option_b'],
                option_c=data['option_c'],
                option_d=data['option_d'],
                correct_answer=data['correct_answer'].upper(),
                explanation=data.get('explanation', ''),
                difficulty_level=data.get('difficulty_level', 'medium')
            )
            
            db.session.add(question)
            db.session.commit()
            
            return jsonify({
                'message': 'Quiz question created successfully',
                'question': question.to_dict(include_answer=True)
            }), 201
            
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    
    @staticmethod
    @admin_required
    def update_quiz_question(question_id):
        try:
            question = QuizQuestion.query.get(question_id)
            if not question:
                return jsonify({'error': 'Question not found'}), 404
            
            data = request.get_json()
            
            if 'category' in data:
                question.category = data['category']
            if 'question_text' in data:
                question.question_text = data['question_text']
            if 'option_a' in data:
                question.option_a = data['option_a']
            if 'option_b' in data:
                question.option_b = data['option_b']
            if 'option_c' in data:
                question.option_c = data['option_c']
            if 'option_d' in data:
                question.option_d = data['option_d']
            if 'correct_answer' in data:
                question.correct_answer = data['correct_answer'].upper()
            if 'explanation' in data:
                question.explanation = data['explanation']
            if 'difficulty_level' in data:
                question.difficulty_level = data['difficulty_level']
            if 'is_active' in data:
                question.is_active = data['is_active']
            
            db.session.commit()
            
            return jsonify({
                'message': 'Question updated successfully',
                'question': question.to_dict(include_answer=True)
            }), 200
            
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    
    @staticmethod
    @admin_required
    def delete_quiz_question(question_id):
        try:
            question = QuizQuestion.query.get(question_id)
            if not question:
                return jsonify({'error': 'Question not found'}), 404
            
            db.session.delete(question)
            db.session.commit()
            
            return jsonify({'message': 'Question deleted successfully'}), 200
            
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    
    # Resource Management
    @staticmethod
    @admin_required
    def create_resource():
        try:
            data = request.get_json()
            
            required_fields = ['title', 'resource_type', 'skill_category', 'difficulty_level']
            
            for field in required_fields:
                if not data.get(field):
                    return jsonify({'error': f'{field} is required'}), 400
            
            resource = Resource(
                title=data['title'],
                description=data.get('description', ''),
                resource_type=data['resource_type'],
                url=data.get('url', ''),
                skill_category=data['skill_category'],
                difficulty_level=data['difficulty_level'],
                estimated_hours=data.get('estimated_hours'),
                is_free=data.get('is_free', True),
                rating=data.get('rating'),
                tags=json.dumps(data.get('tags', [])),
                thumbnail_url=data.get('thumbnail_url', ''),
                author=data.get('author', ''),
                platform=data.get('platform', '')
            )
            
            db.session.add(resource)
            db.session.commit()
            
            return jsonify({
                'message': 'Resource created successfully',
                'resource': resource.to_dict()
            }), 201
            
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    
    # Dashboard Statistics
    @staticmethod
    @admin_required
    def get_dashboard_stats():
        try:
            total_users = User.query.count()
            active_users = User.query.filter_by(is_active=True).count()
            total_questions = QuizQuestion.query.count()
            total_resources = Resource.query.count()
            total_roadmaps = UserRoadmap.query.count()
            
            # Recent registrations (last 30 days)
            from datetime import timedelta
            thirty_days_ago = datetime.utcnow() - timedelta(days=30)
            new_users = User.query.filter(User.created_at >= thirty_days_ago).count()
            
            # Quiz completion stats
            quiz_attempts = QuizResult.query.count()
            
            return jsonify({
                'statistics': {
                    'total_users': total_users,
                    'active_users': active_users,
                    'new_users_30_days': new_users,
                    'total_questions': total_questions,
                    'total_resources': total_resources,
                    'total_roadmaps': total_roadmaps,
                    'quiz_attempts': quiz_attempts
                }
            }), 200
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500