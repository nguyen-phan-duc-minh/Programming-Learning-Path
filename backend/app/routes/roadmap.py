from flask import Blueprint
from app.controllers.roadmap_controller import RoadmapController

roadmap_bp = Blueprint('roadmap', __name__)

@roadmap_bp.route('/generate', methods=['POST'])
def generate_roadmap():
    return RoadmapController.generate_roadmap()

@roadmap_bp.route('/user', methods=['GET'])
def get_user_roadmap():
    return RoadmapController.get_user_roadmap()

@roadmap_bp.route('/progress/update', methods=['PUT'])
def update_task_progress():
    return RoadmapController.update_task_progress()