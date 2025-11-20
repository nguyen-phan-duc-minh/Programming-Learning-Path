#!/usr/bin/env python3
"""
Script to initialize the database and create all tables
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import app, db

def init_database():
    """Initialize database and create all tables"""
    print("🔄 Initializing database...")
    
    with app.app_context():
        try:
            # Drop all tables first (for fresh start)
            db.drop_all()
            print("✅ Dropped existing tables")
            
            # Create all tables
            db.create_all()
            print("✅ Created all tables")
            
            # Verify tables were created
            from sqlalchemy import inspect
            inspector = inspect(db.engine)
            tables = inspector.get_table_names()
            
            print(f"📋 Created tables: {', '.join(tables)}")
            
            if tables:
                print("🎉 Database initialized successfully!")
                return True
            else:
                print("❌ No tables were created")
                return False
                
        except Exception as e:
            print(f"❌ Error initializing database: {str(e)}")
            return False

if __name__ == "__main__":
    success = init_database()
    sys.exit(0 if success else 1)