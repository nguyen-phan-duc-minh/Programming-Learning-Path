from flask import Blueprint

# Import all blueprints
from .auth import auth_bp
from .survey import survey_bp
from .learning_path import learning_path_bp

# Register all blueprints
def register_blueprints(app):
    """Register all application blueprints"""
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(survey_bp, url_prefix='/api')
    app.register_blueprint(learning_path_bp, url_prefix='/api')

__all__ = ['register_blueprints', 'auth_bp', 'survey_bp', 'learning_path_bp']
