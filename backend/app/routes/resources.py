from flask import Blueprint
from app.controllers.resource_controller import ResourceController

resources_bp = Blueprint('resources', __name__)

@resources_bp.route('/', methods=['GET'])
def get_resources():
    return ResourceController.get_resources()

@resources_bp.route('/personalized', methods=['GET'])
def get_personalized_resources():
    return ResourceController.get_personalized_resources()

@resources_bp.route('/progress', methods=['POST'])
def track_resource_progress():
    return ResourceController.track_resource_progress()

@resources_bp.route('/progress', methods=['GET'])
def get_user_progress():
    return ResourceController.get_user_progress()