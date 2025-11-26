from flask import Blueprint, request, jsonify
from services.learning_path_service import LearningPathService
from models import DailySchedule, db

learning_path_bp = Blueprint('learning_path', __name__)


@learning_path_bp.route('/learning-path/<int:path_id>', methods=['GET'])
def get_learning_path(path_id):
    """Get learning path details with all daily schedules"""
    try:
        result = LearningPathService.get_learning_path_details(path_id)
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@learning_path_bp.route('/daily-schedule/<int:schedule_id>/complete', methods=['POST'])
def complete_daily_schedule(schedule_id):
    """Mark a daily schedule as completed"""
    try:
        schedule = DailySchedule.query.get_or_404(schedule_id)
        schedule.completed = True
        db.session.commit()
        
        return jsonify({'message': 'Day completed successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
