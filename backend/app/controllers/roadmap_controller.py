from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.user import User, SkillProfile
from app.models.roadmap import RoadmapTemplate, UserRoadmap, TaskProgress
from datetime import datetime, timedelta
import json

class RoadmapController:
    
    @staticmethod
    @jwt_required()
    def generate_roadmap():
        try:
            current_user_id = int(get_jwt_identity())
            
            # Get user's skill profile
            skill_profile = SkillProfile.query.filter_by(user_id=current_user_id).first()
            if not skill_profile:
                return jsonify({'error': 'Please complete your assessment first'}), 400
            
            # Find suitable roadmap template
            template = RoadmapTemplate.query.filter_by(
                career_path=skill_profile.career_goal.lower().replace(' ', '_'),
                level_requirement=skill_profile.current_level.lower(),
                is_active=True
            ).first()
            
            if not template:
                # Find a generic template or create a basic one
                template = RoadmapTemplate.query.filter_by(
                    career_path='general',
                    level_requirement=skill_profile.current_level.lower(),
                    is_active=True
                ).first()
            
            # Generate personalized roadmap based on user's profile
            personalized_plan = RoadmapController._generate_personalized_plan(skill_profile, template)
            
            # Check if user already has an active roadmap
            existing_roadmap = UserRoadmap.query.filter_by(
                user_id=current_user_id,
                is_active=True
            ).first()
            
            if existing_roadmap:
                # Update existing roadmap
                existing_roadmap.personalized_plan = json.dumps(personalized_plan)
                existing_roadmap.template_id = template.id if template else None
                existing_roadmap.updated_at = datetime.utcnow()
                roadmap = existing_roadmap
            else:
                # Create new roadmap
                roadmap = UserRoadmap(
                    user_id=current_user_id,
                    template_id=template.id if template else None,
                    title=f"{skill_profile.career_goal} Learning Path",
                    personalized_plan=json.dumps(personalized_plan)
                )
                db.session.add(roadmap)
            
            db.session.commit()
            
            # Generate initial tasks
            RoadmapController._generate_initial_tasks(roadmap, personalized_plan)
            
            return jsonify({
                'message': 'Roadmap generated successfully',
                'roadmap': roadmap.to_dict(),
                'template': template.to_dict() if template else None
            }), 200
            
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    
    @staticmethod
    def _generate_personalized_plan(skill_profile, template):
        """Generate personalized learning plan based on user's profile"""
        
        # Base plan structure
        base_plan = {
            "duration_weeks": 12,
            "weekly_schedule": [],
            "daily_hours": skill_profile.daily_study_hours,
            "focus_areas": []
        }
        
        # Adjust based on skill scores
        if skill_profile.html_css_js_score < 60:
            base_plan["focus_areas"].append("Web Fundamentals")
        if skill_profile.oop_sql_score < 60:
            base_plan["focus_areas"].append("Programming Concepts")
        if skill_profile.python_numpy_score < 60:
            base_plan["focus_areas"].append("Python Programming")
        if skill_profile.algorithm_score < 60:
            base_plan["focus_areas"].append("Data Structures & Algorithms")
        
        # Generate weekly schedule
        for week in range(1, 13):
            week_plan = {
                "week": week,
                "title": f"Week {week}",
                "objectives": [],
                "daily_tasks": [],
                "milestone": ""
            }
            
            # Customize based on career goal and week
            if skill_profile.career_goal.lower() == 'frontend':
                week_plan = RoadmapController._generate_frontend_week(week, skill_profile)
            elif skill_profile.career_goal.lower() == 'backend':
                week_plan = RoadmapController._generate_backend_week(week, skill_profile)
            elif skill_profile.career_goal.lower() == 'ai engineer':
                week_plan = RoadmapController._generate_ai_week(week, skill_profile)
            else:
                week_plan = RoadmapController._generate_general_week(week, skill_profile)
            
            base_plan["weekly_schedule"].append(week_plan)
        
        return base_plan
    
    @staticmethod
    def _generate_frontend_week(week, skill_profile):
        """Generate frontend-specific weekly plan"""
        week_plans = {
            1: {
                "week": week,
                "title": "HTML & CSS Fundamentals",
                "objectives": ["Master HTML structure", "Learn CSS styling", "Understand responsive design"],
                "daily_tasks": [
                    "HTML basics and semantic tags",
                    "CSS selectors and properties",
                    "Flexbox layout",
                    "CSS Grid system",
                    "Responsive design principles",
                    "Build a static webpage",
                    "Practice exercises"
                ],
                "milestone": "Create a responsive landing page"
            },
            2: {
                "week": week,
                "title": "JavaScript Fundamentals",
                "objectives": ["Learn JS syntax", "Understand DOM manipulation", "Event handling"],
                "daily_tasks": [
                    "JavaScript variables and functions",
                    "Arrays and objects",
                    "DOM manipulation",
                    "Event listeners",
                    "Form validation",
                    "Interactive elements",
                    "Mini project: Calculator"
                ],
                "milestone": "Build an interactive web application"
            }
            # Add more weeks...
        }
        
        return week_plans.get(week, {
            "week": week,
            "title": f"Week {week} - Advanced Topics",
            "objectives": ["Continue learning", "Practice projects"],
            "daily_tasks": ["Daily coding practice", "Review concepts", "Work on projects"],
            "milestone": f"Complete week {week} objectives"
        })
    
    @staticmethod
    def _generate_backend_week(week, skill_profile):
        """Generate backend-specific weekly plan"""
        # Similar structure for backend development
        return {
            "week": week,
            "title": f"Backend Development - Week {week}",
            "objectives": ["Server-side programming", "Database management", "API development"],
            "daily_tasks": ["Python/Node.js basics", "Database design", "REST API", "Authentication"],
            "milestone": f"Build backend service for week {week}"
        }
    
    @staticmethod
    def _generate_ai_week(week, skill_profile):
        """Generate AI engineering weekly plan"""
        return {
            "week": week,
            "title": f"AI Engineering - Week {week}",
            "objectives": ["Machine learning basics", "Python for AI", "Data analysis"],
            "daily_tasks": ["Python numpy/pandas", "ML algorithms", "Data preprocessing", "Model training"],
            "milestone": f"Complete AI project for week {week}"
        }
    
    @staticmethod
    def _generate_general_week(week, skill_profile):
        """Generate general programming weekly plan"""
        return {
            "week": week,
            "title": f"Programming Fundamentals - Week {week}",
            "objectives": ["Core programming concepts", "Problem solving", "Best practices"],
            "daily_tasks": ["Algorithm practice", "Code review", "Documentation", "Testing"],
            "milestone": f"Master fundamentals for week {week}"
        }
    
    @staticmethod
    def _generate_initial_tasks(roadmap, personalized_plan):
        """Generate initial tasks for the first week"""
        try:
            if not personalized_plan.get('weekly_schedule'):
                return
            
            first_week = personalized_plan['weekly_schedule'][0]
            
            for day, task in enumerate(first_week.get('daily_tasks', []), 1):
                task_progress = TaskProgress(
                    user_id=roadmap.user_id,
                    roadmap_id=roadmap.id,
                    task_type='daily_task',
                    task_name=task,
                    description=f"Complete: {task}",
                    week_number=1,
                    day_number=day,
                    due_date=(datetime.utcnow() + timedelta(days=day-1)).date()
                )
                db.session.add(task_progress)
            
            db.session.commit()
            
        except Exception as e:
            print(f"Error generating initial tasks: {e}")
    
    @staticmethod
    @jwt_required()
    def get_user_roadmap():
        try:
            current_user_id = int(get_jwt_identity())
            
            roadmap = UserRoadmap.query.filter_by(
                user_id=current_user_id,
                is_active=True
            ).first()
            
            if not roadmap:
                return jsonify({'error': 'No active roadmap found'}), 404
            
            # Get current week tasks
            current_tasks = TaskProgress.query.filter_by(
                user_id=current_user_id,
                roadmap_id=roadmap.id,
                week_number=roadmap.current_week
            ).all()
            
            # Calculate progress
            total_tasks = TaskProgress.query.filter_by(
                user_id=current_user_id,
                roadmap_id=roadmap.id
            ).count()
            
            completed_tasks = TaskProgress.query.filter_by(
                user_id=current_user_id,
                roadmap_id=roadmap.id,
                is_completed=True
            ).count()
            
            if total_tasks > 0:
                roadmap.progress_percentage = int((completed_tasks / total_tasks) * 100)
                db.session.commit()
            
            return jsonify({
                'roadmap': roadmap.to_dict(),
                'current_tasks': [task.to_dict() for task in current_tasks],
                'progress_stats': {
                    'total_tasks': total_tasks,
                    'completed_tasks': completed_tasks,
                    'progress_percentage': roadmap.progress_percentage,
                    'current_week': roadmap.current_week
                }
            }), 200
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @staticmethod
    @jwt_required()
    def update_task_progress():
        try:
            current_user_id = int(get_jwt_identity())
            data = request.get_json()
            
            task_id = data.get('task_id')
            is_completed = data.get('is_completed', False)
            study_hours = data.get('study_hours', 0)
            notes = data.get('notes', '')
            
            if not task_id:
                return jsonify({'error': 'Task ID is required'}), 400
            
            task = TaskProgress.query.filter_by(
                id=task_id,
                user_id=current_user_id
            ).first()
            
            if not task:
                return jsonify({'error': 'Task not found'}), 404
            
            task.is_completed = is_completed
            task.study_hours = float(study_hours) if study_hours else task.study_hours
            task.notes = notes if notes else task.notes
            
            if is_completed and not task.completed_at:
                task.completed_at = datetime.utcnow()
            elif not is_completed:
                task.completed_at = None
            
            db.session.commit()
            
            return jsonify({
                'message': 'Task progress updated successfully',
                'task': task.to_dict()
            }), 200
            
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500