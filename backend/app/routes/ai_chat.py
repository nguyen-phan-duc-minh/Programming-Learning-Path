from flask import Blueprint
from app.controllers.ai_chat_controller import AIChatController

ai_chat_bp = Blueprint('ai_chat', __name__)

@ai_chat_bp.route('/chat', methods=['POST'])
def chat_with_ai():
    return AIChatController.chat_with_ai()

@ai_chat_bp.route('/history', methods=['GET'])
def get_chat_history():
    return AIChatController.get_chat_history()