"""
Setup script to initialize the database with sample data
Run this script after setting up the virtual environment and before starting the app
"""

import os
import sys
sys.path.append(os.path.dirname(__file__))

from app import create_app, db
from app.models import *
import json
from datetime import datetime

def create_sample_users():
    """Create admin and sample users"""
    print("Creating sample users...")
    
    # Create admin user
    admin = User(
        email=os.getenv('ADMIN_EMAIL', 'admin@example.com'),
        first_name='Admin',
        last_name='User',
        role='admin'
    )
    admin.set_password(os.getenv('ADMIN_PASSWORD', 'admin123'))
    db.session.add(admin)
    
    # Create sample regular user
    user = User(
        email='john.doe@example.com',
        first_name='John',
        last_name='Doe',
        role='user'
    )
    user.set_password('password123')
    db.session.add(user)
    
    db.session.commit()
    print("✓ Sample users created")

def create_quiz_questions():
    """Create sample quiz questions for all categories"""
    print("Creating quiz questions...")
    
    # HTML/CSS/JS Questions
    html_css_js_questions = [
        {
            "category": "html_css_js",
            "question_text": "What does HTML stand for?",
            "option_a": "Hyper Text Markup Language",
            "option_b": "High Tech Modern Language", 
            "option_c": "Home Tool Markup Language",
            "option_d": "Hyperlink and Text Markup Language",
            "correct_answer": "A",
            "explanation": "HTML stands for Hyper Text Markup Language, which is the standard markup language for creating web pages.",
            "difficulty_level": "easy"
        },
        {
            "category": "html_css_js",
            "question_text": "Which CSS property is used to change the background color?",
            "option_a": "color",
            "option_b": "background-color",
            "option_c": "bg-color",
            "option_d": "background",
            "correct_answer": "B",
            "explanation": "The background-color property is used to set the background color of an element.",
            "difficulty_level": "easy"
        },
        {
            "category": "html_css_js",
            "question_text": "What is the correct JavaScript syntax to change the content of an HTML element?",
            "option_a": "document.getElement('demo').innerHTML = 'Hello World!';",
            "option_b": "document.getElementById('demo').innerHTML = 'Hello World!';",
            "option_c": "document.getElementByName('demo').innerHTML = 'Hello World!';",
            "option_d": "document.getElementByTag('demo').innerHTML = 'Hello World!';",
            "correct_answer": "B",
            "explanation": "getElementById() is the correct method to select an element by its ID in JavaScript.",
            "difficulty_level": "medium"
        },
        {
            "category": "html_css_js",
            "question_text": "Which of the following is NOT a JavaScript data type?",
            "option_a": "String",
            "option_b": "Boolean",
            "option_c": "Float",
            "option_d": "Number",
            "correct_answer": "C",
            "explanation": "JavaScript doesn't have a specific 'Float' data type. Numbers in JavaScript can be integers or floating-point.",
            "difficulty_level": "medium"
        },
        {
            "category": "html_css_js",
            "question_text": "What does CSS Grid provide that Flexbox doesn't?",
            "option_a": "One-dimensional layout",
            "option_b": "Two-dimensional layout",
            "option_c": "Better browser support",
            "option_d": "Faster rendering",
            "correct_answer": "B",
            "explanation": "CSS Grid provides two-dimensional layout capabilities, while Flexbox is primarily one-dimensional.",
            "difficulty_level": "hard"
        }
    ]
    
    # OOP/SQL Questions
    oop_sql_questions = [
        {
            "category": "oop_sql",
            "question_text": "What is encapsulation in Object-Oriented Programming?",
            "option_a": "Creating multiple objects",
            "option_b": "Hiding internal data and methods",
            "option_c": "Inheriting from parent class",
            "option_d": "Overriding methods",
            "correct_answer": "B",
            "explanation": "Encapsulation is the principle of hiding internal data and methods from the outside world.",
            "difficulty_level": "medium"
        },
        {
            "category": "oop_sql",
            "question_text": "Which SQL command is used to retrieve data from a database?",
            "option_a": "GET",
            "option_b": "SELECT",
            "option_c": "RETRIEVE",
            "option_d": "FETCH",
            "correct_answer": "B",
            "explanation": "SELECT is the SQL command used to retrieve data from a database.",
            "difficulty_level": "easy"
        },
        {
            "category": "oop_sql",
            "question_text": "What is polymorphism in OOP?",
            "option_a": "Having multiple constructors",
            "option_b": "Creating multiple objects",
            "option_c": "Objects of different types responding to the same interface",
            "option_d": "Inheriting multiple classes",
            "correct_answer": "C",
            "explanation": "Polymorphism allows objects of different types to be treated as instances of the same type through a common interface.",
            "difficulty_level": "hard"
        },
        {
            "category": "oop_sql",
            "question_text": "Which SQL JOIN returns records that have matching values in both tables?",
            "option_a": "LEFT JOIN",
            "option_b": "RIGHT JOIN",
            "option_c": "INNER JOIN",
            "option_d": "OUTER JOIN",
            "correct_answer": "C",
            "explanation": "INNER JOIN returns only the records that have matching values in both tables.",
            "difficulty_level": "medium"
        },
        {
            "category": "oop_sql",
            "question_text": "What is the purpose of a primary key in a database table?",
            "option_a": "To speed up queries",
            "option_b": "To uniquely identify each record",
            "option_c": "To create relationships",
            "option_d": "To sort data",
            "correct_answer": "B",
            "explanation": "A primary key uniquely identifies each record in a database table.",
            "difficulty_level": "easy"
        }
    ]
    
    # Python/NumPy Questions
    python_numpy_questions = [
        {
            "category": "python_numpy",
            "question_text": "What is the correct way to create a list in Python?",
            "option_a": "list = (1, 2, 3)",
            "option_b": "list = [1, 2, 3]",
            "option_c": "list = {1, 2, 3}",
            "option_d": "list = <1, 2, 3>",
            "correct_answer": "B",
            "explanation": "Lists in Python are created using square brackets [].",
            "difficulty_level": "easy"
        },
        {
            "category": "python_numpy",
            "question_text": "Which NumPy function is used to create an array?",
            "option_a": "np.create()",
            "option_b": "np.array()",
            "option_c": "np.make_array()",
            "option_d": "np.new_array()",
            "correct_answer": "B",
            "explanation": "np.array() is the function used to create NumPy arrays.",
            "difficulty_level": "easy"
        },
        {
            "category": "python_numpy",
            "question_text": "What is the difference between a tuple and a list in Python?",
            "option_a": "Tuples are mutable, lists are immutable",
            "option_b": "Tuples are immutable, lists are mutable",
            "option_c": "No difference",
            "option_d": "Tuples are faster for all operations",
            "correct_answer": "B",
            "explanation": "Tuples are immutable (cannot be changed after creation), while lists are mutable.",
            "difficulty_level": "medium"
        },
        {
            "category": "python_numpy",
            "question_text": "What does the NumPy function 'reshape()' do?",
            "option_a": "Changes the data type of array",
            "option_b": "Sorts the array elements",
            "option_c": "Changes the shape of an array without changing its data",
            "option_d": "Creates a new array",
            "correct_answer": "C",
            "explanation": "reshape() changes the shape of an array without changing the underlying data.",
            "difficulty_level": "medium"
        },
        {
            "category": "python_numpy",
            "question_text": "Which Python keyword is used to define a function?",
            "option_a": "function",
            "option_b": "def",
            "option_c": "func",
            "option_d": "define",
            "correct_answer": "B",
            "explanation": "The 'def' keyword is used to define functions in Python.",
            "difficulty_level": "easy"
        }
    ]
    
    # Algorithm Questions
    algorithm_questions = [
        {
            "category": "algorithm",
            "question_text": "What is the time complexity of binary search?",
            "option_a": "O(n)",
            "option_b": "O(log n)",
            "option_c": "O(n log n)",
            "option_d": "O(n²)",
            "correct_answer": "B",
            "explanation": "Binary search has O(log n) time complexity because it eliminates half of the remaining elements in each step.",
            "difficulty_level": "medium"
        },
        {
            "category": "algorithm",
            "question_text": "Which data structure uses LIFO (Last In, First Out) principle?",
            "option_a": "Queue",
            "option_b": "Array",
            "option_c": "Stack",
            "option_d": "Linked List",
            "correct_answer": "C",
            "explanation": "Stack follows the LIFO principle where the last element added is the first one to be removed.",
            "difficulty_level": "easy"
        },
        {
            "category": "algorithm",
            "question_text": "What is the worst-case time complexity of Quick Sort?",
            "option_a": "O(n log n)",
            "option_b": "O(n)",
            "option_c": "O(n²)",
            "option_d": "O(log n)",
            "correct_answer": "C",
            "explanation": "Quick Sort has O(n²) worst-case time complexity when the pivot is always the smallest or largest element.",
            "difficulty_level": "hard"
        },
        {
            "category": "algorithm",
            "question_text": "Which sorting algorithm is most efficient for small datasets?",
            "option_a": "Merge Sort",
            "option_b": "Quick Sort",
            "option_c": "Insertion Sort",
            "option_d": "Heap Sort",
            "correct_answer": "C",
            "explanation": "Insertion Sort is often most efficient for small datasets due to its simplicity and low overhead.",
            "difficulty_level": "medium"
        },
        {
            "category": "algorithm",
            "question_text": "What is a hash collision?",
            "option_a": "When two keys hash to the same value",
            "option_b": "When a hash function fails",
            "option_c": "When memory runs out",
            "option_d": "When data is corrupted",
            "correct_answer": "A",
            "explanation": "A hash collision occurs when two different keys produce the same hash value.",
            "difficulty_level": "medium"
        }
    ]
    
    # Add all questions to database
    all_questions = html_css_js_questions + oop_sql_questions + python_numpy_questions + algorithm_questions
    
    for q_data in all_questions:
        question = QuizQuestion(**q_data)
        db.session.add(question)
    
    db.session.commit()
    print(f"✓ Created {len(all_questions)} quiz questions")

def create_roadmap_templates():
    """Create sample roadmap templates"""
    print("Creating roadmap templates...")
    
    # Frontend Roadmap
    frontend_roadmap = {
        "name": "Frontend Developer Path",
        "career_path": "frontend",
        "level_requirement": "beginner",
        "duration_weeks": 12,
        "description": "Complete roadmap to become a Frontend Developer",
        "weekly_plan": json.dumps({
            "week_1": {
                "title": "HTML & CSS Fundamentals",
                "objectives": ["Learn HTML structure", "Master CSS styling", "Responsive design"],
                "resources": ["HTML tutorials", "CSS documentation", "Responsive design guides"]
            },
            "week_2": {
                "title": "JavaScript Basics",
                "objectives": ["Variables and functions", "DOM manipulation", "Event handling"],
                "resources": ["JavaScript tutorials", "DOM exercises", "Event handling examples"]
            },
            "week_3": {
                "title": "Advanced CSS",
                "objectives": ["Flexbox", "Grid", "Animations"],
                "resources": ["CSS Grid guide", "Flexbox tutorial", "Animation examples"]
            },
            "week_4": {
                "title": "JavaScript ES6+",
                "objectives": ["Arrow functions", "Promises", "Async/await"],
                "resources": ["ES6 tutorials", "Promise documentation", "Async programming guides"]
            }
        }),
        "skills_covered": json.dumps(["HTML", "CSS", "JavaScript", "Responsive Design", "DOM Manipulation"]),
        "prerequisites": json.dumps(["Basic computer skills", "Text editor knowledge"])
    }
    
    # Backend Roadmap
    backend_roadmap = {
        "name": "Backend Developer Path",
        "career_path": "backend", 
        "level_requirement": "beginner",
        "duration_weeks": 16,
        "description": "Complete roadmap to become a Backend Developer",
        "weekly_plan": json.dumps({
            "week_1": {
                "title": "Programming Fundamentals",
                "objectives": ["Choose a language", "Basic syntax", "Data structures"],
                "resources": ["Python/Node.js tutorials", "Data structure guides"]
            },
            "week_2": {
                "title": "Database Basics",
                "objectives": ["SQL fundamentals", "Database design", "CRUD operations"],
                "resources": ["SQL tutorials", "Database design principles"]
            }
        }),
        "skills_covered": json.dumps(["Python/Node.js", "SQL", "APIs", "Server Management"]),
        "prerequisites": json.dumps(["Programming basics", "Command line knowledge"])
    }
    
    # AI Engineer Roadmap
    ai_roadmap = {
        "name": "AI Engineer Path",
        "career_path": "ai engineer",
        "level_requirement": "intermediate",
        "duration_weeks": 20,
        "description": "Complete roadmap to become an AI Engineer",
        "weekly_plan": json.dumps({
            "week_1": {
                "title": "Python for AI",
                "objectives": ["Python advanced concepts", "NumPy", "Pandas"],
                "resources": ["Python tutorials", "NumPy documentation", "Pandas guides"]
            },
            "week_2": {
                "title": "Mathematics for AI",
                "objectives": ["Linear algebra", "Statistics", "Calculus basics"],
                "resources": ["Khan Academy", "Mathematics courses"]
            }
        }),
        "skills_covered": json.dumps(["Python", "Machine Learning", "Deep Learning", "Data Science"]),
        "prerequisites": json.dumps(["Strong Python skills", "Mathematics background"])
    }
    
    templates = [frontend_roadmap, backend_roadmap, ai_roadmap]
    
    for template_data in templates:
        template = RoadmapTemplate(**template_data)
        db.session.add(template)
    
    db.session.commit()
    print(f"✓ Created {len(templates)} roadmap templates")

def create_sample_resources():
    """Create sample learning resources"""
    print("Creating sample resources...")
    
    resources = [
        # Web Development Resources
        {
            "title": "HTML & CSS Complete Course",
            "description": "Comprehensive course covering HTML and CSS from basics to advanced topics",
            "resource_type": "video",
            "url": "https://www.youtube.com/watch?v=example1",
            "skill_category": "html_css",
            "difficulty_level": "beginner",
            "estimated_hours": 10,
            "is_free": True,
            "rating": 4.5,
            "tags": json.dumps(["html", "css", "web-development", "beginner"]),
            "author": "Web Dev Simplified",
            "platform": "youtube"
        },
        {
            "title": "JavaScript Fundamentals",
            "description": "Learn JavaScript from scratch with practical examples",
            "resource_type": "video",
            "url": "https://www.youtube.com/watch?v=example2",
            "skill_category": "javascript",
            "difficulty_level": "beginner",
            "estimated_hours": 15,
            "is_free": True,
            "rating": 4.8,
            "tags": json.dumps(["javascript", "programming", "web-development"]),
            "author": "Traversy Media",
            "platform": "youtube"
        },
        {
            "title": "React Complete Guide",
            "description": "Master React with hooks, context, and modern patterns",
            "resource_type": "course",
            "url": "https://www.udemy.com/course/react-complete-guide",
            "skill_category": "react",
            "difficulty_level": "intermediate",
            "estimated_hours": 40,
            "is_free": False,
            "rating": 4.7,
            "tags": json.dumps(["react", "frontend", "javascript"]),
            "author": "Maximilian Schwarzmüller",
            "platform": "udemy"
        },
        
        # Backend Resources
        {
            "title": "Python for Everybody",
            "description": "Complete Python course for beginners",
            "resource_type": "course",
            "url": "https://www.coursera.org/specializations/python",
            "skill_category": "python",
            "difficulty_level": "beginner",
            "estimated_hours": 35,
            "is_free": True,
            "rating": 4.8,
            "tags": json.dumps(["python", "programming", "beginner"]),
            "author": "University of Michigan",
            "platform": "coursera"
        },
        {
            "title": "SQL Tutorial",
            "description": "Learn SQL for database management",
            "resource_type": "article",
            "url": "https://www.w3schools.com/sql/",
            "skill_category": "sql",
            "difficulty_level": "beginner",
            "estimated_hours": 8,
            "is_free": True,
            "rating": 4.3,
            "tags": json.dumps(["sql", "database", "beginner"]),
            "author": "W3Schools",
            "platform": "w3schools"
        },
        
        # Algorithm Resources
        {
            "title": "Data Structures and Algorithms",
            "description": "Comprehensive guide to DSA with examples",
            "resource_type": "book",
            "url": "https://example.com/dsa-book",
            "skill_category": "algorithm",
            "difficulty_level": "intermediate",
            "estimated_hours": 60,
            "is_free": False,
            "rating": 4.9,
            "tags": json.dumps(["algorithms", "data-structures", "computer-science"]),
            "author": "Thomas Cormen",
            "platform": "book"
        },
        {
            "title": "LeetCode Problems - Easy",
            "description": "Collection of easy algorithm problems for practice",
            "resource_type": "exercise",
            "url": "https://leetcode.com/problemset/all/?difficulty=Easy",
            "skill_category": "algorithm",
            "difficulty_level": "beginner",
            "estimated_hours": 20,
            "is_free": True,
            "rating": 4.6,
            "tags": json.dumps(["leetcode", "algorithms", "practice"]),
            "author": "LeetCode",
            "platform": "leetcode"
        },
        
        # AI/ML Resources
        {
            "title": "Machine Learning Course",
            "description": "Complete machine learning course with Python",
            "resource_type": "course",
            "url": "https://www.coursera.org/learn/machine-learning",
            "skill_category": "machine_learning",
            "difficulty_level": "intermediate",
            "estimated_hours": 55,
            "is_free": False,
            "rating": 4.9,
            "tags": json.dumps(["machine-learning", "ai", "python"]),
            "author": "Andrew Ng",
            "platform": "coursera"
        },
        {
            "title": "NumPy Tutorial",
            "description": "Learn NumPy for data science and AI",
            "resource_type": "article",
            "url": "https://numpy.org/doc/stable/user/quickstart.html",
            "skill_category": "numpy",
            "difficulty_level": "beginner",
            "estimated_hours": 6,
            "is_free": True,
            "rating": 4.4,
            "tags": json.dumps(["numpy", "python", "data-science"]),
            "author": "NumPy Team",
            "platform": "official-docs"
        }
    ]
    
    for resource_data in resources:
        resource = Resource(**resource_data)
        db.session.add(resource)
    
    db.session.commit()
    print(f"✓ Created {len(resources)} learning resources")

def create_sample_skill_profile():
    """Create a sample skill profile for the demo user"""
    print("Creating sample skill profile...")
    
    # Find the demo user
    user = User.query.filter_by(email='john.doe@example.com').first()
    if user:
        skill_profile = SkillProfile(
            user_id=user.id,
            career_goal='Frontend Developer',
            current_level='beginner',
            math_algorithm_level=3,
            daily_study_hours=2,
            computer_specs=json.dumps({
                "os": "Windows 10",
                "ram": "8GB",
                "processor": "Intel i5"
            }),
            programming_experience="Some HTML/CSS experience from online tutorials",
            html_css_js_score=65,
            oop_sql_score=45,
            python_numpy_score=30,
            algorithm_score=40,
            overall_score=45
        )
        skill_profile.recommended_path = "Frontend Development"
        
        db.session.add(skill_profile)
        db.session.commit()
        print("✓ Created sample skill profile")

def main():
    """Main setup function"""
    print("🚀 Starting database setup...")
    
    # Create Flask app and initialize database
    app = create_app()
    
    with app.app_context():
        # Create all tables
        print("Creating database tables...")
        db.create_all()
        print("✓ Database tables created")
        
        # Create sample data
        create_sample_users()
        create_quiz_questions()
        create_roadmap_templates()
        create_sample_resources()
        create_sample_skill_profile()
        
        print("\n🎉 Database setup completed successfully!")
        print("\nSample accounts created:")
        print("Admin: admin@example.com / admin123")
        print("User: john.doe@example.com / password123")
        print("\nYou can now start the Flask app with: python app.py")

if __name__ == "__main__":
    main()