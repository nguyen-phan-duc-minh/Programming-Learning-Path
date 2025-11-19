from flask import Blueprint
from app.controllers.cv_controller import CVController

cv_bp = Blueprint('cv', __name__)

@cv_bp.route('/generate', methods=['POST'])
def generate_cv():
    return CVController.generate_cv()

@cv_bp.route('/template', methods=['GET'])
def get_cv_template():
    return CVController.get_cv_template()