from flask import request, jsonify, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.user import User, SkillProfile
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib import colors
from reportlab.lib.units import inch
import io
import os
from datetime import datetime

class CVController:
    
    @staticmethod
    @jwt_required()
    def generate_cv():
        try:
            current_user_id = int(get_jwt_identity())
            data = request.get_json()
            
            user = User.query.get(current_user_id)
            skill_profile = SkillProfile.query.filter_by(user_id=current_user_id).first()
            
            if not user:
                return jsonify({'error': 'User not found'}), 404
            
            # Get CV data from request or use defaults
            cv_data = {
                'personal_info': data.get('personal_info', {}),
                'skills': data.get('skills', []),
                'experience': data.get('experience', []),
                'education': data.get('education', []),
                'projects': data.get('projects', []),
                'certifications': data.get('certifications', [])
            }
            
            # Fill in user data if not provided
            if not cv_data['personal_info']:
                cv_data['personal_info'] = {
                    'name': f"{user.first_name} {user.last_name}",
                    'email': user.email,
                    'phone': '',
                    'location': '',
                    'linkedin': '',
                    'github': '',
                    'summary': f"Aspiring {skill_profile.career_goal if skill_profile else 'Developer'} with passion for learning and creating innovative solutions."
                }
            
            # Generate PDF
            pdf_buffer = CVController._create_pdf(cv_data, skill_profile)
            
            return jsonify({
                'message': 'CV generated successfully',
                'pdf_data': pdf_buffer.getvalue().hex(),  # Convert to hex for JSON response
                'filename': f"cv_{user.first_name}_{user.last_name}.pdf"
            }), 200
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @staticmethod
    def _create_pdf(cv_data, skill_profile):
        """Create PDF CV using ReportLab"""
        
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=A4, rightMargin=72, leftMargin=72,
                              topMargin=72, bottomMargin=18)
        
        # Container for the 'Flowable' objects
        story = []
        
        styles = getSampleStyleSheet()
        
        # Title
        title_style = styles['Title']
        title_style.alignment = 1  # Center alignment
        story.append(Paragraph(cv_data['personal_info']['name'], title_style))
        story.append(Spacer(1, 12))
        
        # Contact Information
        contact_info = []
        if cv_data['personal_info'].get('email'):
            contact_info.append(cv_data['personal_info']['email'])
        if cv_data['personal_info'].get('phone'):
            contact_info.append(cv_data['personal_info']['phone'])
        if cv_data['personal_info'].get('location'):
            contact_info.append(cv_data['personal_info']['location'])
        
        if contact_info:
            contact_text = " | ".join(contact_info)
            story.append(Paragraph(contact_text, styles['Normal']))
            story.append(Spacer(1, 12))
        
        # Links
        links = []
        if cv_data['personal_info'].get('linkedin'):
            links.append(f"LinkedIn: {cv_data['personal_info']['linkedin']}")
        if cv_data['personal_info'].get('github'):
            links.append(f"GitHub: {cv_data['personal_info']['github']}")
        
        if links:
            links_text = " | ".join(links)
            story.append(Paragraph(links_text, styles['Normal']))
            story.append(Spacer(1, 12))
        
        # Summary
        if cv_data['personal_info'].get('summary'):
            story.append(Paragraph("<b>PROFESSIONAL SUMMARY</b>", styles['Heading2']))
            story.append(Paragraph(cv_data['personal_info']['summary'], styles['Normal']))
            story.append(Spacer(1, 12))
        
        # Skills Section
        if cv_data['skills'] or skill_profile:
            story.append(Paragraph("<b>TECHNICAL SKILLS</b>", styles['Heading2']))
            
            if skill_profile:
                # Add skills based on quiz scores
                skill_levels = []
                if skill_profile.html_css_js_score > 0:
                    level = CVController._get_skill_level(skill_profile.html_css_js_score)
                    skill_levels.append(f"Web Development (HTML/CSS/JavaScript): {level}")
                if skill_profile.oop_sql_score > 0:
                    level = CVController._get_skill_level(skill_profile.oop_sql_score)
                    skill_levels.append(f"Object-Oriented Programming & SQL: {level}")
                if skill_profile.python_numpy_score > 0:
                    level = CVController._get_skill_level(skill_profile.python_numpy_score)
                    skill_levels.append(f"Python & Data Analysis: {level}")
                if skill_profile.algorithm_score > 0:
                    level = CVController._get_skill_level(skill_profile.algorithm_score)
                    skill_levels.append(f"Algorithms & Data Structures: {level}")
                
                for skill in skill_levels:
                    story.append(Paragraph(f"• {skill}", styles['Normal']))
            
            # Add custom skills
            for skill in cv_data['skills']:
                story.append(Paragraph(f"• {skill}", styles['Normal']))
            
            story.append(Spacer(1, 12))
        
        # Experience Section
        if cv_data['experience']:
            story.append(Paragraph("<b>PROFESSIONAL EXPERIENCE</b>", styles['Heading2']))
            
            for exp in cv_data['experience']:
                # Job title and company
                job_info = f"<b>{exp.get('title', '')}</b> - {exp.get('company', '')}"
                if exp.get('duration'):
                    job_info += f" ({exp['duration']})"
                story.append(Paragraph(job_info, styles['Normal']))
                
                # Description
                if exp.get('description'):
                    story.append(Paragraph(exp['description'], styles['Normal']))
                
                story.append(Spacer(1, 6))
            
            story.append(Spacer(1, 12))
        
        # Education Section
        if cv_data['education']:
            story.append(Paragraph("<b>EDUCATION</b>", styles['Heading2']))
            
            for edu in cv_data['education']:
                edu_info = f"<b>{edu.get('degree', '')}</b> - {edu.get('institution', '')}"
                if edu.get('year'):
                    edu_info += f" ({edu['year']})"
                story.append(Paragraph(edu_info, styles['Normal']))
                
                if edu.get('details'):
                    story.append(Paragraph(edu['details'], styles['Normal']))
                
                story.append(Spacer(1, 6))
            
            story.append(Spacer(1, 12))
        
        # Projects Section
        if cv_data['projects']:
            story.append(Paragraph("<b>PROJECTS</b>", styles['Heading2']))
            
            for project in cv_data['projects']:
                project_info = f"<b>{project.get('name', '')}</b>"
                if project.get('technologies'):
                    project_info += f" - {project['technologies']}"
                story.append(Paragraph(project_info, styles['Normal']))
                
                if project.get('description'):
                    story.append(Paragraph(project['description'], styles['Normal']))
                
                if project.get('url'):
                    story.append(Paragraph(f"URL: {project['url']}", styles['Normal']))
                
                story.append(Spacer(1, 6))
            
            story.append(Spacer(1, 12))
        
        # Certifications Section
        if cv_data['certifications']:
            story.append(Paragraph("<b>CERTIFICATIONS</b>", styles['Heading2']))
            
            for cert in cv_data['certifications']:
                cert_info = f"• {cert.get('name', '')}"
                if cert.get('issuer'):
                    cert_info += f" - {cert['issuer']}"
                if cert.get('date'):
                    cert_info += f" ({cert['date']})"
                story.append(Paragraph(cert_info, styles['Normal']))
            
            story.append(Spacer(1, 12))
        
        # Build PDF
        doc.build(story)
        buffer.seek(0)
        
        return buffer
    
    @staticmethod
    def _get_skill_level(score):
        """Convert quiz score to skill level"""
        if score >= 80:
            return "Advanced"
        elif score >= 60:
            return "Intermediate"
        elif score >= 40:
            return "Basic"
        else:
            return "Beginner"
    
    @staticmethod
    @jwt_required()
    def get_cv_template():
        """Get CV template data for user to fill"""
        try:
            current_user_id = int(get_jwt_identity())
            user = User.query.get(current_user_id)
            skill_profile = SkillProfile.query.filter_by(user_id=current_user_id).first()
            
            template = {
                'personal_info': {
                    'name': f"{user.first_name} {user.last_name}",
                    'email': user.email,
                    'phone': '',
                    'location': '',
                    'linkedin': '',
                    'github': '',
                    'summary': f"Aspiring {skill_profile.career_goal if skill_profile else 'Developer'} with passion for learning and creating innovative solutions."
                },
                'skills': [
                    'Programming Languages: Python, JavaScript',
                    'Web Technologies: HTML, CSS, React',
                    'Database: SQL, SQLite',
                    'Tools: Git, VS Code'
                ],
                'experience': [
                    {
                        'title': 'Software Developer Intern',
                        'company': 'Tech Company',
                        'duration': 'June 2024 - August 2024',
                        'description': 'Developed web applications using React and Node.js. Collaborated with team to deliver high-quality software solutions.'
                    }
                ],
                'education': [
                    {
                        'degree': 'Bachelor of Computer Science',
                        'institution': 'University Name',
                        'year': '2024',
                        'details': 'Relevant coursework: Data Structures, Algorithms, Software Engineering'
                    }
                ],
                'projects': [
                    {
                        'name': 'Personal Portfolio Website',
                        'technologies': 'React, Node.js, MongoDB',
                        'description': 'Built a responsive portfolio website showcasing programming projects and skills.',
                        'url': 'https://github.com/username/portfolio'
                    }
                ],
                'certifications': [
                    {
                        'name': 'JavaScript Certification',
                        'issuer': 'freeCodeCamp',
                        'date': '2024'
                    }
                ]
            }
            
            return jsonify({
                'template': template,
                'message': 'CV template ready for customization'
            }), 200
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500