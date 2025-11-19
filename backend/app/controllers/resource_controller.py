from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.resource import Resource, UserProgress
from app.models.user import User, SkillProfile

class ResourceController:
    
    @staticmethod
    @jwt_required()
    def get_resources():
        try:
            # Get query parameters
            skill = request.args.get('skill', '')
            level = request.args.get('level', '')
            resource_type = request.args.get('type', '')
            is_free = request.args.get('free')
            page = request.args.get('page', 1, type=int)
            per_page = request.args.get('per_page', 20, type=int)
            
            # Build query
            query = Resource.query.filter_by(is_active=True)
            
            if skill:
                query = query.filter(Resource.skill_category.ilike(f'%{skill}%'))
            
            if level:
                query = query.filter_by(difficulty_level=level.lower())
            
            if resource_type:
                query = query.filter_by(resource_type=resource_type.lower())
            
            if is_free is not None:
                is_free_bool = is_free.lower() == 'true'
                query = query.filter_by(is_free=is_free_bool)
            
            # Paginate results
            resources = query.paginate(
                page=page, 
                per_page=per_page, 
                error_out=False
            )
            
            return jsonify({
                'resources': [resource.to_dict() for resource in resources.items],
                'pagination': {
                    'page': page,
                    'pages': resources.pages,
                    'per_page': per_page,
                    'total': resources.total,
                    'has_next': resources.has_next,
                    'has_prev': resources.has_prev
                }
            }), 200
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @staticmethod
    @jwt_required()
    def get_personalized_resources():
        try:
            current_user_id = int(get_jwt_identity())
            
            # Get user's skill profile
            skill_profile = SkillProfile.query.filter_by(user_id=current_user_id).first()
            
            if not skill_profile:
                return jsonify({'error': 'Please complete your assessment first'}), 400
            
            # Determine user's weak areas based on quiz scores
            weak_areas = []
            if skill_profile.html_css_js_score < 70:
                weak_areas.extend(['html', 'css', 'javascript'])
            if skill_profile.oop_sql_score < 70:
                weak_areas.extend(['oop', 'sql', 'database'])
            if skill_profile.python_numpy_score < 70:
                weak_areas.extend(['python', 'numpy', 'data_analysis'])
            if skill_profile.algorithm_score < 70:
                weak_areas.extend(['algorithm', 'data_structures'])
            
            # Get resources for weak areas
            recommended_resources = []
            
            for area in weak_areas:
                resources = Resource.query.filter(
                    Resource.skill_category.ilike(f'%{area}%'),
                    Resource.difficulty_level == skill_profile.current_level.lower(),
                    Resource.is_active == True
                ).limit(5).all()
                
                recommended_resources.extend(resources)
            
            # Get resources for career goal
            career_resources = Resource.query.filter(
                Resource.skill_category.ilike(f'%{skill_profile.career_goal.lower()}%'),
                Resource.difficulty_level == skill_profile.current_level.lower(),
                Resource.is_active == True
            ).limit(10).all()
            
            # Remove duplicates
            all_resources = list({r.id: r for r in recommended_resources + career_resources}.values())
            
            return jsonify({
                'personalized_resources': [resource.to_dict() for resource in all_resources],
                'weak_areas': weak_areas,
                'career_goal': skill_profile.career_goal,
                'recommended_count': len(all_resources)
            }), 200
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @staticmethod
    @jwt_required()
    def track_resource_progress():
        try:
            current_user_id = int(get_jwt_identity())
            data = request.get_json()
            
            resource_id = data.get('resource_id')
            progress_percentage = data.get('progress_percentage', 0)
            time_spent = data.get('time_spent', 0)
            is_completed = data.get('is_completed', False)
            rating = data.get('rating')
            notes = data.get('notes', '')
            
            if not resource_id:
                return jsonify({'error': 'Resource ID is required'}), 400
            
            # Check if resource exists
            resource = Resource.query.get(resource_id)
            if not resource:
                return jsonify({'error': 'Resource not found'}), 404
            
            # Check if progress already exists
            user_progress = UserProgress.query.filter_by(
                user_id=current_user_id,
                resource_id=resource_id
            ).first()
            
            if user_progress:
                # Update existing progress
                user_progress.progress_percentage = progress_percentage
                user_progress.time_spent += time_spent
                user_progress.is_completed = is_completed
                if rating:
                    user_progress.rating = rating
                if notes:
                    user_progress.notes = notes
                if is_completed and not user_progress.completed_at:
                    user_progress.completed_at = db.func.now()
            else:
                # Create new progress record
                user_progress = UserProgress(
                    user_id=current_user_id,
                    resource_id=resource_id,
                    progress_percentage=progress_percentage,
                    time_spent=time_spent,
                    is_completed=is_completed,
                    rating=rating,
                    notes=notes
                )
                if is_completed:
                    user_progress.completed_at = db.func.now()
                
                db.session.add(user_progress)
            
            db.session.commit()
            
            return jsonify({
                'message': 'Progress updated successfully',
                'user_progress': user_progress.to_dict()
            }), 200
            
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    
    @staticmethod
    @jwt_required()
    def get_user_progress():
        try:
            current_user_id = int(get_jwt_identity())
            
            # Get all user progress
            user_progress = UserProgress.query.filter_by(user_id=current_user_id).all()
            
            # Calculate statistics
            total_resources = len(user_progress)
            completed_resources = len([p for p in user_progress if p.is_completed])
            total_time_spent = sum([p.time_spent for p in user_progress])
            average_rating = 0
            
            ratings = [p.rating for p in user_progress if p.rating]
            if ratings:
                average_rating = sum(ratings) / len(ratings)
            
            return jsonify({
                'progress': [p.to_dict() for p in user_progress],
                'statistics': {
                    'total_resources': total_resources,
                    'completed_resources': completed_resources,
                    'completion_rate': (completed_resources / total_resources * 100) if total_resources > 0 else 0,
                    'total_time_spent': total_time_spent,
                    'average_rating': round(average_rating, 2)
                }
            }), 200
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500