from flask import Blueprint
from app.controllers.auth_controller import AuthController

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    return AuthController.register()

@auth_bp.route('/login', methods=['POST'])
def login():
    return AuthController.login()

@auth_bp.route('/refresh', methods=['POST'])
def refresh():
    return AuthController.refresh()

@auth_bp.route('/me', methods=['GET'])
def get_current_user():
    return AuthController.get_current_user()

@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    return AuthController.forgot_password()

@auth_bp.route('/change-password', methods=['PUT'])
def change_password():
    return AuthController.change_password()

@auth_bp.route('/profile', methods=['PUT'])
def update_profile():
    return AuthController.update_profile()