from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.user import User, SkillProfile
from app.models.quiz import QuizQuestion, QuizResult
from datetime import datetime
import json
import random

class AssessmentController:
    
    @staticmethod
    @jwt_required()
    def submit_assessment():
        try:
            current_user_id = int(get_jwt_identity())
            data = request.get_json()
            
            # Validate required fields
            required_fields = ['career_goal', 'current_level', 'math_algorithm_level', 
                             'daily_study_hours', 'programming_experience']
            for field in required_fields:
                if not data.get(field):
                    return jsonify({'error': f'{field} is required'}), 400
            
            # Check if user already has a skill profile
            existing_profile = SkillProfile.query.filter_by(user_id=current_user_id).first()
            
            if existing_profile:
                # Update existing profile
                existing_profile.career_goal = data['career_goal']
                existing_profile.current_level = data['current_level']
                existing_profile.math_algorithm_level = int(data['math_algorithm_level'])
                existing_profile.daily_study_hours = int(data['daily_study_hours'])
                existing_profile.programming_experience = data['programming_experience']
                existing_profile.computer_specs = json.dumps(data.get('computer_specs', {}))
                existing_profile.updated_at = datetime.utcnow()
                
                skill_profile = existing_profile
            else:
                # Create new skill profile
                skill_profile = SkillProfile(
                    user_id=current_user_id,
                    career_goal=data['career_goal'],
                    current_level=data['current_level'],
                    math_algorithm_level=int(data['math_algorithm_level']),
                    daily_study_hours=int(data['daily_study_hours']),
                    programming_experience=data['programming_experience'],
                    computer_specs=json.dumps(data.get('computer_specs', {}))
                )
                db.session.add(skill_profile)
            
            db.session.commit()
            
            return jsonify({
                'message': 'Assessment submitted successfully',
                'skill_profile': skill_profile.to_dict()
            }), 200
            
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    
    @staticmethod
    @jwt_required()
    def get_quiz_questions(category):
        try:
            # Validate category
            valid_categories = ['html_css_js', 'oop_sql', 'python_numpy', 'algorithm']
            if category not in valid_categories:
                return jsonify({'error': 'Invalid quiz category'}), 400
            
            # Get random questions for the category (limit to 10)
            questions = QuizQuestion.query.filter_by(
                category=category, 
                is_active=True
            ).order_by(db.func.random()).limit(10).all()
            
            if not questions:
                return jsonify({'error': 'No questions found for this category'}), 404
            
            # Return questions without correct answers
            questions_data = [q.to_dict(include_answer=False) for q in questions]
            
            return jsonify({
                'category': category,
                'questions': questions_data,
                'total_questions': len(questions_data)
            }), 200
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @staticmethod
    @jwt_required()
    def submit_quiz():
        try:
            current_user_id = int(get_jwt_identity())
            data = request.get_json()
            
            # Validate required fields
            if not data.get('category') or not data.get('answers'):
                return jsonify({'error': 'Category and answers are required'}), 400
            
            category = data['category']
            user_answers = data['answers']  # List of {question_id: answer}
            time_taken = data.get('time_taken', 0)
            
            # Get correct answers
            question_ids = [int(answer['question_id']) for answer in user_answers]
            questions = QuizQuestion.query.filter(QuizQuestion.id.in_(question_ids)).all()
            
            if not questions:
                return jsonify({'error': 'No questions found'}), 404
            
            # Calculate score
            correct_answers = 0
            total_questions = len(questions)
            
            question_dict = {q.id: q for q in questions}
            
            for answer in user_answers:
                question_id = int(answer['question_id'])
                user_answer = answer['answer'].upper()
                
                if question_id in question_dict:
                    if question_dict[question_id].correct_answer == user_answer:
                        correct_answers += 1
            
            # Create quiz result
            quiz_result = QuizResult(
                user_id=current_user_id,
                category=category,
                total_questions=total_questions,
                correct_answers=correct_answers,
                time_taken=time_taken,
                answers=json.dumps(user_answers)
            )
            quiz_result.calculate_score()
            
            db.session.add(quiz_result)
            
            # Update skill profile with quiz score
            skill_profile = SkillProfile.query.filter_by(user_id=current_user_id).first()
            if skill_profile:
                if category == 'html_css_js':
                    skill_profile.html_css_js_score = quiz_result.score_percentage
                elif category == 'oop_sql':
                    skill_profile.oop_sql_score = quiz_result.score_percentage
                elif category == 'python_numpy':
                    skill_profile.python_numpy_score = quiz_result.score_percentage
                elif category == 'algorithm':
                    skill_profile.algorithm_score = quiz_result.score_percentage
                
                # Recalculate overall score
                skill_profile.calculate_overall_score()
                skill_profile.updated_at = datetime.utcnow()
            
            db.session.commit()
            
            # Prepare detailed results with correct answers
            detailed_results = []
            for answer in user_answers:
                question_id = int(answer['question_id'])
                if question_id in question_dict:
                    question = question_dict[question_id]
                    detailed_results.append({
                        'question_id': question_id,
                        'question_text': question.question_text,
                        'user_answer': answer['answer'],
                        'correct_answer': question.correct_answer,
                        'is_correct': question.correct_answer == answer['answer'].upper(),
                        'explanation': question.explanation
                    })
            
            return jsonify({
                'message': 'Quiz submitted successfully',
                'quiz_result': quiz_result.to_dict(),
                'detailed_results': detailed_results
            }), 200
            
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    
    @staticmethod
    @jwt_required()
    def get_user_profile():
        try:
            current_user_id = int(get_jwt_identity())
            
            user = User.query.get(current_user_id)
            if not user:
                return jsonify({'error': 'User not found'}), 404
            
            skill_profile = SkillProfile.query.filter_by(user_id=current_user_id).first()
            quiz_results = QuizResult.query.filter_by(user_id=current_user_id).all()
            
            # Get latest quiz results by category
            latest_results = {}
            for result in quiz_results:
                if result.category not in latest_results or result.created_at > latest_results[result.category]['created_at']:
                    latest_results[result.category] = result.to_dict()
            
            return jsonify({
                'user': user.to_dict(),
                'skill_profile': skill_profile.to_dict() if skill_profile else None,
                'quiz_results': list(latest_results.values()),
                'quiz_history': [result.to_dict() for result in quiz_results]
            }), 200
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500