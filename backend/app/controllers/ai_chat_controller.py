from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.user import User, SkillProfile
import requests
import os
import json

class AIChatController:
    
    @staticmethod
    @jwt_required()
    def chat_with_ai():
        try:
            current_user_id = int(get_jwt_identity())
            data = request.get_json()
            
            if not data.get('message'):
                return jsonify({'error': 'Message is required'}), 400
            
            user_message = data['message']
            
            # Get user context for personalized responses
            user = User.query.get(current_user_id)
            skill_profile = SkillProfile.query.filter_by(user_id=current_user_id).first()
            
            # Build context for AI
            context = AIChatController._build_user_context(user, skill_profile)
            
            # Prepare prompt for Ollama
            system_prompt = f"""You are an AI programming mentor helping learners on their coding journey. 
            
User Context:
{context}

Please provide helpful, encouraging, and personalized advice based on the user's profile and learning goals. 
Keep responses concise but informative. Focus on practical guidance."""
            
            full_prompt = f"{system_prompt}\n\nUser Question: {user_message}\n\nAI Response:"
            
            # Call Ollama API
            ollama_response = AIChatController._call_ollama_api(full_prompt)
            
            if not ollama_response:
                # Fallback response if Ollama is not available
                ollama_response = AIChatController._get_fallback_response(user_message, context)
            
            return jsonify({
                'message': user_message,
                'response': ollama_response,
                'timestamp': '2024-01-01T00:00:00Z'  # You can add actual timestamp
            }), 200
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @staticmethod
    def _build_user_context(user, skill_profile):
        """Build user context for AI"""
        context = f"User: {user.first_name} {user.last_name}"
        
        if skill_profile:
            context += f"""
- Career Goal: {skill_profile.career_goal}
- Current Level: {skill_profile.current_level}
- Daily Study Hours: {skill_profile.daily_study_hours}
- Quiz Scores: HTML/CSS/JS: {skill_profile.html_css_js_score}%, OOP/SQL: {skill_profile.oop_sql_score}%, Python/NumPy: {skill_profile.python_numpy_score}%, Algorithms: {skill_profile.algorithm_score}%
- Overall Score: {skill_profile.overall_score}%
- Programming Experience: {skill_profile.programming_experience}"""
        else:
            context += "\n- No assessment completed yet"
        
        return context
    
    @staticmethod
    def _call_ollama_api(prompt):
        """Call Ollama API"""
        try:
            ollama_base_url = os.getenv('OLLAMA_BASE_URL', 'http://localhost:11434')
            ollama_model = os.getenv('OLLAMA_MODEL', 'llama2')
            
            url = f"{ollama_base_url}/api/generate"
            
            payload = {
                "model": ollama_model,
                "prompt": prompt,
                "stream": False,
                "options": {
                    "temperature": 0.7,
                    "max_tokens": 500
                }
            }
            
            response = requests.post(url, json=payload, timeout=30)
            
            if response.status_code == 200:
                result = response.json()
                return result.get('response', 'Sorry, I could not generate a response.')
            else:
                return None
                
        except requests.exceptions.RequestException:
            return None
        except Exception:
            return None
    
    @staticmethod
    def _get_fallback_response(user_message, context):
        """Provide fallback responses when Ollama is not available"""
        
        user_message_lower = user_message.lower()
        
        # Programming concepts
        if any(word in user_message_lower for word in ['javascript', 'js', 'html', 'css']):
            return """For web development, I recommend starting with HTML for structure, CSS for styling, and JavaScript for interactivity. 
            
Key learning path:
1. HTML semantics and forms
2. CSS flexbox and grid
3. JavaScript fundamentals (variables, functions, DOM)
4. Practice with small projects

Would you like specific resources for any of these topics?"""
        
        elif any(word in user_message_lower for word in ['python', 'programming', 'code']):
            return """Python is a great language for beginners! Here's what I suggest:

1. Start with basic syntax (variables, loops, functions)
2. Learn data structures (lists, dictionaries)
3. Practice with small projects
4. Explore libraries like NumPy for data analysis

Based on your profile, focus on areas where you scored lower in assessments. What specific Python topic interests you most?"""
        
        elif any(word in user_message_lower for word in ['algorithm', 'data structure']):
            return """Algorithms and data structures are fundamental for programming success!

Start with:
1. Big O notation basics
2. Arrays and linked lists
3. Stacks and queues
4. Basic sorting algorithms
5. Binary search

Practice on platforms like LeetCode or HackerRank. Start with easy problems and gradually increase difficulty."""
        
        elif any(word in user_message_lower for word in ['career', 'job', 'work']):
            return """For career development in programming:

1. Build a strong portfolio with diverse projects
2. Contribute to open source projects
3. Network with other developers
4. Keep learning new technologies
5. Practice technical interviews

Focus on your chosen career path and develop both technical and soft skills. What specific career aspect would you like guidance on?"""
        
        else:
            return """I'm here to help with your programming journey! I can assist with:

- Programming concepts and languages
- Career advice and learning paths
- Code review and best practices
- Algorithm and data structure guidance
- Project ideas and implementation tips

Please feel free to ask specific questions about programming, and I'll provide personalized advice based on your learning profile."""

    @staticmethod
    @jwt_required()
    def get_chat_history():
        """Get user's chat history (placeholder - you might want to store chat history in database)"""
        try:
            # For now, return empty history
            # In a real implementation, you would store and retrieve chat history from database
            
            return jsonify({
                'chat_history': [],
                'message': 'Chat history feature will be implemented with database storage'
            }), 200
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500