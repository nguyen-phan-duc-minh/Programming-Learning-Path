from flask import Blueprint
from app.controllers.assessment_controller import AssessmentController

assessment_bp = Blueprint('assessment', __name__)

@assessment_bp.route('/submit', methods=['POST'])
def submit_assessment():
    return AssessmentController.submit_assessment()

@assessment_bp.route('/quiz/<category>', methods=['GET'])
def get_quiz_questions(category):
    return AssessmentController.get_quiz_questions(category)

@assessment_bp.route('/quiz/submit', methods=['POST'])
def submit_quiz():
    return AssessmentController.submit_quiz()

@assessment_bp.route('/profile', methods=['GET'])
def get_user_profile():
    return AssessmentController.get_user_profile()