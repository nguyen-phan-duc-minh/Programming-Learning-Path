from flask import Blueprint
from app.controllers.admin_controller import AdminController

admin_bp = Blueprint('admin', __name__)

# User Management
@admin_bp.route('/users', methods=['GET'])
def get_all_users():
    return AdminController.get_all_users()

@admin_bp.route('/users/<int:user_id>', methods=['GET'])
def get_user_details(user_id):
    return AdminController.get_user_details(user_id)

@admin_bp.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    return AdminController.update_user(user_id)

@admin_bp.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    return AdminController.delete_user(user_id)

# Quiz Management
@admin_bp.route('/quiz/questions', methods=['GET'])
def get_quiz_questions():
    return AdminController.get_quiz_questions()

@admin_bp.route('/quiz/questions', methods=['POST'])
def create_quiz_question():
    return AdminController.create_quiz_question()

@admin_bp.route('/quiz/questions/<int:question_id>', methods=['PUT'])
def update_quiz_question(question_id):
    return AdminController.update_quiz_question(question_id)

@admin_bp.route('/quiz/questions/<int:question_id>', methods=['DELETE'])
def delete_quiz_question(question_id):
    return AdminController.delete_quiz_question(question_id)

# Resource Management
@admin_bp.route('/resources', methods=['POST'])
def create_resource():
    return AdminController.create_resource()

# Dashboard
@admin_bp.route('/dashboard/stats', methods=['GET'])
def get_dashboard_stats():
    return AdminController.get_dashboard_stats()