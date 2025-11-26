"""
Main application entry point
Flask application with factory pattern
"""

from flask import Flask
from flask_cors import CORS
from config import get_config
from models import db
from routes import register_blueprints


def create_app(config_name=None):
    """
    Application factory pattern
    
    Args:
        config_name: Configuration name (development, production, testing)
        
    Returns:
        Flask application instance
    """
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(get_config(config_name))
    
    # Initialize extensions
    db.init_app(app)
    
    # CORS configuration - must be before blueprint registration
    CORS(app, 
         resources={r"/api/*": {"origins": "*"}},
         allow_headers=["Content-Type", "Authorization"],
         methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
         supports_credentials=True,
         expose_headers=["Content-Type", "Authorization"]
    )
    
    # Register blueprints
    register_blueprints(app)
    
    # Create database tables
    with app.app_context():
        db.create_all()
    
    return app


# Create application instance
app = create_app()


if __name__ == '__main__':
    import os
    debug_mode = os.getenv('FLASK_ENV', 'development') == 'development'
    app.run(debug=debug_mode, port=5001)
