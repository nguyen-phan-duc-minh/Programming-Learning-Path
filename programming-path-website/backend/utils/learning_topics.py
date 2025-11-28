"""
Learning topics data for different learning paths
"""


def get_software_topics(experience, interests):
    """Get software development topics based on experience and interests"""
    base_topics = [
        {
            "title": "Python Basics & Syntax",
            "content": "Learn Python fundamentals, variables, and basic operations",
            "hours": 2,
            "topics": ["variables", "functions", "loops"],
            "videos": [
                {"title": "Python Tutorial for Beginners", "url": "https://www.youtube.com/watch?v=_uQrJ0TkZlc", "duration": "6:14:07"},
                {"title": "Python Variables and Data Types", "url": "https://www.youtube.com/watch?v=cQT33yu9pY8", "duration": "15:32"}
            ],
            "resources": [
                {"title": "Python.org Official Tutorial", "url": "https://docs.python.org/3/tutorial/", "type": "documentation"},
                {"title": "Real Python - Python Basics", "url": "https://realpython.com/python-basics/", "type": "article"}
            ]
        },
        {
            "title": "Data Structures in Python",
            "content": "Master lists, dictionaries, sets, and tuples",
            "hours": 2,
            "topics": ["lists", "dictionaries", "sets"],
            "videos": [
                {"title": "Python Data Structures", "url": "https://www.youtube.com/watch?v=R-HLU9Fl5ug", "duration": "1:15:00"},
                {"title": "Lists vs Tuples vs Sets vs Dictionaries", "url": "https://www.youtube.com/watch?v=W8KRzm-HUcc", "duration": "12:19"}
            ],
            "resources": [
                {"title": "Python Data Structures Documentation", "url": "https://docs.python.org/3/tutorial/datastructures.html", "type": "documentation"},
                {"title": "Real Python - Python Data Structures", "url": "https://realpython.com/python-data-structures/", "type": "article"}
            ]
        },
        {
            "title": "Object-Oriented Programming",
            "content": "Learn classes, objects, and inheritance",
            "hours": 3,
            "topics": ["classes", "objects", "inheritance"],
            "videos": [
                {"title": "Python OOP Tutorial", "url": "https://www.youtube.com/watch?v=ZDa-Z5JzLYM", "duration": "2:28:26"},
                {"title": "Python Classes and Objects", "url": "https://www.youtube.com/watch?v=apACNr7DC_s", "duration": "20:52"}
            ],
            "resources": [
                {"title": "Python Classes Tutorial", "url": "https://docs.python.org/3/tutorial/classes.html", "type": "documentation"},
                {"title": "Real Python - OOP in Python 3", "url": "https://realpython.com/python3-object-oriented-programming/", "type": "article"}
            ]
        },
        {
            "title": "File Handling & I/O",
            "content": "Work with files and user input/output",
            "hours": 1.5,
            "topics": ["file operations", "input/output"],
            "videos": [
                {"title": "Python File Handling", "url": "https://www.youtube.com/watch?v=Uh2ebFW8OYM", "duration": "32:33"},
                {"title": "Reading and Writing Files in Python", "url": "https://www.youtube.com/watch?v=4mX0uPGw2Qc", "duration": "16:44"}
            ],
            "resources": [
                {"title": "Python File I/O Documentation", "url": "https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files", "type": "documentation"},
                {"title": "Automate the Boring Stuff - Files", "url": "https://automatetheboringstuff.com/2e/chapter9/", "type": "article"}
            ]
        },
        {
            "title": "Error Handling & Debugging",
            "content": "Learn exception handling and debugging techniques",
            "hours": 1.5,
            "topics": ["try/except", "debugging"],
            "videos": [
                {"title": "Python Exception Handling", "url": "https://www.youtube.com/watch?v=NIWwJbo-9_8", "duration": "52:27"},
                {"title": "Python Debugging with Pdb", "url": "https://www.youtube.com/watch?v=P0pIW5tJrRM", "duration": "25:38"}
            ],
            "resources": [
                {"title": "Python Errors and Exceptions", "url": "https://docs.python.org/3/tutorial/errors.html", "type": "documentation"},
                {"title": "Real Python - Python Debugging", "url": "https://realpython.com/python-debugging-pdb/", "type": "article"}
            ]
        },
        {
            "title": "Web Development Basics",
            "content": "Introduction to HTML, CSS, and web concepts",
            "hours": 2,
            "topics": ["HTML", "CSS", "web basics"],
            "videos": [
                {"title": "HTML & CSS Crash Course", "url": "https://www.youtube.com/watch?v=UB1O30fR-EE", "duration": "1:40:00"},
                {"title": "Web Development Fundamentals", "url": "https://www.youtube.com/watch?v=ZxHQdwMpe9g", "duration": "45:32"}
            ],
            "resources": [
                {"title": "MDN Web Docs - HTML", "url": "https://developer.mozilla.org/en-US/docs/Web/HTML", "type": "documentation"},
                {"title": "FreeCodeCamp - Responsive Web Design", "url": "https://www.freecodecamp.org/learn/responsive-web-design/", "type": "course"}
            ]
        },
        {
            "title": "Flask Web Framework",
            "content": "Build your first web application with Flask",
            "hours": 3,
            "topics": ["Flask", "routing", "templates"],
            "videos": [
                {"title": "Flask Tutorial for Beginners", "url": "https://www.youtube.com/watch?v=Z1RJmh_OqeA", "duration": "1:23:45"},
                {"title": "Python Flask Tutorial", "url": "https://www.youtube.com/watch?v=MwZwr5Tvyxo", "duration": "6:17:48"}
            ],
            "resources": [
                {"title": "Flask Official Documentation", "url": "https://flask.palletsprojects.com/", "type": "documentation"},
                {"title": "Real Python - Flask Tutorial", "url": "https://realpython.com/tutorials/flask/", "type": "tutorial"}
            ]
        },
        {
            "title": "Database Fundamentals",
            "content": "Learn SQL and database design",
            "hours": 2,
            "topics": ["SQL", "database design"],
            "videos": [
                {"title": "SQL Tutorial for Beginners", "url": "https://www.youtube.com/watch?v=HXV3zeQKqGY", "duration": "4:20:52"},
                {"title": "Database Design Course", "url": "https://www.youtube.com/watch?v=ztHopE5Wnpc", "duration": "8:29:00"}
            ],
            "resources": [
                {"title": "W3Schools SQL Tutorial", "url": "https://www.w3schools.com/sql/", "type": "tutorial"},
                {"title": "SQLite Tutorial", "url": "https://www.sqlitetutorial.net/", "type": "tutorial"}
            ]
        },
        {
            "title": "API Development",
            "content": "Create RESTful APIs with Flask",
            "hours": 2.5,
            "topics": ["REST APIs", "JSON", "endpoints"],
            "videos": [
                {"title": "Build a REST API with Flask", "url": "https://www.youtube.com/watch?v=GMppyAPbLYk", "duration": "1:57:45"},
                {"title": "RESTful API Design", "url": "https://www.youtube.com/watch?v=qbLc5a9jdXo", "duration": "45:22"}
            ],
            "resources": [
                {"title": "Flask-RESTful Documentation", "url": "https://flask-restful.readthedocs.io/", "type": "documentation"},
                {"title": "RESTful API Design Guide", "url": "https://restfulapi.net/", "type": "guide"}
            ]
        },
        {
            "title": "Frontend Integration",
            "content": "Connect frontend with backend APIs",
            "hours": 2,
            "topics": ["AJAX", "fetch API", "integration"],
            "videos": [
                {"title": "JavaScript Fetch API Tutorial", "url": "https://www.youtube.com/watch?v=cuEtnrL9-H0", "duration": "42:14"},
                {"title": "Frontend to Backend Connection", "url": "https://www.youtube.com/watch?v=FcwfjMebjTU", "duration": "1:18:32"}
            ],
            "resources": [
                {"title": "MDN Fetch API Guide", "url": "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API", "type": "documentation"},
                {"title": "JavaScript.info - Fetch", "url": "https://javascript.info/fetch", "type": "tutorial"}
            ]
        },
        {
            "title": "Authentication & Security",
            "content": "Implement user authentication and security",
            "hours": 2.5,
            "topics": ["authentication", "security", "JWT"],
            "videos": [
                {"title": "JWT Authentication Tutorial", "url": "https://www.youtube.com/watch?v=mbsmsi7l3r4", "duration": "1:13:54"},
                {"title": "Flask Login & Authentication", "url": "https://www.youtube.com/watch?v=2dEM-s3mRLE", "duration": "45:23"}
            ],
            "resources": [
                {"title": "Flask-Login Documentation", "url": "https://flask-login.readthedocs.io/", "type": "documentation"},
                {"title": "JWT.io - Introduction", "url": "https://jwt.io/introduction", "type": "guide"}
            ]
        },
        {
            "title": "Testing Your Code",
            "content": "Write unit tests and test your applications",
            "hours": 2,
            "topics": ["unit testing", "pytest", "TDD"],
            "videos": [
                {"title": "Python Testing with Pytest", "url": "https://www.youtube.com/watch?v=YbpKMIUjvK8", "duration": "1:40:35"},
                {"title": "Unit Testing in Python", "url": "https://www.youtube.com/watch?v=6tNS--WetLI", "duration": "52:27"}
            ],
            "resources": [
                {"title": "Pytest Documentation", "url": "https://docs.pytest.org/", "type": "documentation"},
                {"title": "Real Python - Testing Guide", "url": "https://realpython.com/pytest-python-testing/", "type": "tutorial"}
            ]
        },
        {
            "title": "Version Control with Git",
            "content": "Master Git for code versioning",
            "hours": 1.5,
            "topics": ["Git", "GitHub", "version control"],
            "videos": [
                {"title": "Git and GitHub for Beginners", "url": "https://www.youtube.com/watch?v=RGOj5yH7evk", "duration": "1:08:41"},
                {"title": "Git Tutorial for Beginners", "url": "https://www.youtube.com/watch?v=8JJ101D3knE", "duration": "1:09:13"}
            ],
            "resources": [
                {"title": "Git Official Documentation", "url": "https://git-scm.com/doc", "type": "documentation"},
                {"title": "GitHub Learning Lab", "url": "https://lab.github.com/", "type": "interactive"}
            ]
        },
        {
            "title": "Deployment Basics",
            "content": "Deploy your web application to the cloud",
            "hours": 2,
            "topics": ["deployment", "cloud", "hosting"],
            "videos": [
                {"title": "Deploy Flask App to Heroku", "url": "https://www.youtube.com/watch?v=skuKOW7kA-Y", "duration": "38:47"},
                {"title": "Python Web App Deployment", "url": "https://www.youtube.com/watch?v=goToXTC96Co", "duration": "1:22:15"}
            ],
            "resources": [
                {"title": "Heroku Python Guide", "url": "https://devcenter.heroku.com/articles/getting-started-with-python", "type": "guide"},
                {"title": "DigitalOcean App Platform", "url": "https://www.digitalocean.com/products/app-platform", "type": "platform"}
            ]
        },
        {
            "title": "Advanced Python Features",
            "content": "Explore decorators, generators, and context managers",
            "hours": 2.5,
            "topics": ["decorators", "generators", "context managers"],
            "videos": [
                {"title": "Python Decorators Tutorial", "url": "https://www.youtube.com/watch?v=FsAPt_9Bf3U", "duration": "1:00:15"},
                {"title": "Python Generators Explained", "url": "https://www.youtube.com/watch?v=bD05uGo_sVI", "duration": "24:37"}
            ],
            "resources": [
                {"title": "Real Python - Decorators", "url": "https://realpython.com/primer-on-python-decorators/", "type": "article"},
                {"title": "Python Generators Guide", "url": "https://wiki.python.org/moin/Generators", "type": "documentation"}
            ]
        },
        {
            "title": "Working with APIs",
            "content": "Consume third-party APIs and web services",
            "hours": 2,
            "topics": ["API consumption", "requests library", "web services"],
            "videos": [
                {"title": "Python Requests Library Tutorial", "url": "https://www.youtube.com/watch?v=tb8gHvYlCFs", "duration": "1:18:32"},
                {"title": "Working with REST APIs", "url": "https://www.youtube.com/watch?v=s7wmiS2mSXY", "duration": "52:14"}
            ],
            "resources": [
                {"title": "Requests Documentation", "url": "https://docs.python-requests.org/", "type": "documentation"},
                {"title": "Real Python - API Integration", "url": "https://realpython.com/api-integration-in-python/", "type": "tutorial"}
            ]
        },
        {
            "title": "Database Relationships",
            "content": "Advanced database operations and relationships",
            "hours": 2.5,
            "topics": ["foreign keys", "joins", "relationships"],
            "videos": [
                {"title": "SQL Joins Explained", "url": "https://www.youtube.com/watch?v=9yeOJ0ZMUYw", "duration": "11:31"},
                {"title": "Database Relationships Tutorial", "url": "https://www.youtube.com/watch?v=V5DyvUfsboA", "duration": "35:47"}
            ],
            "resources": [
                {"title": "SQLAlchemy Relationships", "url": "https://docs.sqlalchemy.org/en/14/orm/relationships.html", "type": "documentation"},
                {"title": "Database Design Tutorial", "url": "https://www.lucidchart.com/pages/database-diagram/database-design", "type": "guide"}
            ]
        },
        {
            "title": "Frontend Framework Basics",
            "content": "Introduction to React or Vue.js",
            "hours": 3,
            "topics": ["React", "components", "state management"],
            "videos": [
                {"title": "React JS Full Course", "url": "https://www.youtube.com/watch?v=b9eMGE7QtTk", "duration": "11:17:08"},
                {"title": "React Tutorial for Beginners", "url": "https://www.youtube.com/watch?v=SqcY0GlETPk", "duration": "2:25:26"}
            ],
            "resources": [
                {"title": "React Official Documentation", "url": "https://react.dev/", "type": "documentation"},
                {"title": "React Tutorial - W3Schools", "url": "https://www.w3schools.com/react/", "type": "tutorial"}
            ]
        },
        {
            "title": "Performance Optimization",
            "content": "Optimize your Python applications",
            "hours": 2,
            "topics": ["performance", "optimization", "profiling"],
            "videos": [
                {"title": "Python Performance Tips", "url": "https://www.youtube.com/watch?v=YY7yJHo0M5I", "duration": "48:23"},
                {"title": "Profiling Python Code", "url": "https://www.youtube.com/watch?v=m_a0fN48Alw", "duration": "35:12"}
            ],
            "resources": [
                {"title": "Python Performance Tips", "url": "https://wiki.python.org/moin/PythonSpeed/PerformanceTips", "type": "guide"},
                {"title": "Real Python - Profiling", "url": "https://realpython.com/python-profiling/", "type": "article"}
            ]
        },
        {
            "title": "Logging & Monitoring",
            "content": "Implement logging and application monitoring",
            "hours": 1.5,
            "topics": ["logging", "monitoring", "debugging"],
            "videos": [
                {"title": "Python Logging Tutorial", "url": "https://www.youtube.com/watch?v=jxmzY9soFXg", "duration": "31:24"},
                {"title": "Application Monitoring Basics", "url": "https://www.youtube.com/watch?v=FNxBU2cT5A0", "duration": "42:18"}
            ],
            "resources": [
                {"title": "Python Logging Documentation", "url": "https://docs.python.org/3/library/logging.html", "type": "documentation"},
                {"title": "Real Python - Logging Guide", "url": "https://realpython.com/python-logging/", "type": "tutorial"}
            ]
        },
        {
            "title": "Code Quality & Best Practices",
            "content": "Write clean, maintainable code",
            "hours": 2,
            "topics": ["code quality", "best practices", "PEP8"],
            "videos": [
                {"title": "Clean Code Python", "url": "https://www.youtube.com/watch?v=7EmboKQH8lM", "duration": "1:08:47"},
                {"title": "Python Best Practices", "url": "https://www.youtube.com/watch?v=Eun4OFkkNeA", "duration": "52:33"}
            ],
            "resources": [
                {"title": "PEP 8 Style Guide", "url": "https://pep8.org/", "type": "documentation"},
                {"title": "The Hitchhiker's Guide to Python", "url": "https://docs.python-guide.org/", "type": "guide"}
            ]
        },
        {
            "title": "Package Management",
            "content": "Manage dependencies and create packages",
            "hours": 1.5,
            "topics": ["pip", "virtual environments", "packaging"],
            "videos": [
                {"title": "Python Virtual Environments", "url": "https://www.youtube.com/watch?v=APOPm01BVrk", "duration": "20:14"},
                {"title": "Creating Python Packages", "url": "https://www.youtube.com/watch?v=5KEObONUkik", "duration": "48:25"}
            ],
            "resources": [
                {"title": "Python Packaging Guide", "url": "https://packaging.python.org/", "type": "documentation"},
                {"title": "Pipenv Documentation", "url": "https://pipenv.pypa.io/", "type": "documentation"}
            ]
        },
        {
            "title": "Asynchronous Programming",
            "content": "Learn async/await and concurrent programming",
            "hours": 2.5,
            "topics": ["asyncio", "concurrency", "async/await"],
            "videos": [
                {"title": "Python Asyncio Tutorial", "url": "https://www.youtube.com/watch?v=t5Bo1Je9EmE", "duration": "1:02:44"},
                {"title": "Async Programming in Python", "url": "https://www.youtube.com/watch?v=2IW-ZEui4h4", "duration": "38:17"}
            ],
            "resources": [
                {"title": "Asyncio Documentation", "url": "https://docs.python.org/3/library/asyncio.html", "type": "documentation"},
                {"title": "Real Python - Async IO", "url": "https://realpython.com/async-io-python/", "type": "tutorial"}
            ]
        },
        {
            "title": "Microservices Basics",
            "content": "Introduction to microservices architecture",
            "hours": 2,
            "topics": ["microservices", "architecture", "design patterns"],
            "videos": [
                {"title": "Microservices Explained", "url": "https://www.youtube.com/watch?v=rv4LlmLmVWk", "duration": "8:54"},
                {"title": "Building Microservices", "url": "https://www.youtube.com/watch?v=CdBtNQZH8a4", "duration": "1:15:22"}
            ],
            "resources": [
                {"title": "Microservices.io", "url": "https://microservices.io/", "type": "guide"},
                {"title": "Martin Fowler - Microservices", "url": "https://martinfowler.com/articles/microservices.html", "type": "article"}
            ]
        },
        {
            "title": "Container Basics",
            "content": "Introduction to Docker and containerization",
            "hours": 2,
            "topics": ["Docker", "containers", "deployment"],
            "videos": [
                {"title": "Docker Tutorial for Beginners", "url": "https://www.youtube.com/watch?v=3c-iBn73dDE", "duration": "2:10:23"},
                {"title": "Docker Crash Course", "url": "https://www.youtube.com/watch?v=pg19Z8LL06w", "duration": "1:40:15"}
            ],
            "resources": [
                {"title": "Docker Official Documentation", "url": "https://docs.docker.com/get-started/", "type": "documentation"},
                {"title": "Docker Hub", "url": "https://hub.docker.com/", "type": "platform"}
            ]
        },
        {
            "title": "DevOps Fundamentals",
            "content": "CI/CD pipelines and automation",
            "hours": 2.5,
            "topics": ["CI/CD", "automation", "DevOps"],
            "videos": [
                {"title": "DevOps Tutorial for Beginners", "url": "https://www.youtube.com/watch?v=Xrgk023l4lI", "duration": "1:02:47"},
                {"title": "GitHub Actions CI/CD Tutorial", "url": "https://www.youtube.com/watch?v=R8_veQiYBjI", "duration": "1:15:38"}
            ],
            "resources": [
                {"title": "GitHub Actions Documentation", "url": "https://docs.github.com/en/actions", "type": "documentation"},
                {"title": "The DevOps Handbook", "url": "https://itrevolution.com/product/the-devops-handbook/", "type": "book"}
            ]
        },
        {
            "title": "Scalability Concepts",
            "content": "Design scalable applications",
            "hours": 2,
            "topics": ["scalability", "load balancing", "caching"],
            "videos": [
                {"title": "System Design Basics", "url": "https://www.youtube.com/watch?v=UzLMhqg3_Wc", "duration": "1:28:35"},
                {"title": "Scalability Concepts", "url": "https://www.youtube.com/watch?v=xpDnVSmNFX0", "duration": "42:18"}
            ],
            "resources": [
                {"title": "System Design Primer", "url": "https://github.com/donnemartin/system-design-primer", "type": "guide"},
                {"title": "High Scalability Blog", "url": "http://highscalability.com/", "type": "blog"}
            ]
        },
        {
            "title": "Security Best Practices",
            "content": "Secure coding practices and common vulnerabilities",
            "hours": 2,
            "topics": ["security", "vulnerabilities", "OWASP"],
            "videos": [
                {"title": "Web Security Fundamentals", "url": "https://www.youtube.com/watch?v=F5iLEZ2gwvk", "duration": "1:42:33"},
                {"title": "OWASP Top 10 Explained", "url": "https://www.youtube.com/watch?v=rWHvp7rUka8", "duration": "1:18:47"}
            ],
            "resources": [
                {"title": "OWASP Top Ten", "url": "https://owasp.org/www-project-top-ten/", "type": "guide"},
                {"title": "Flask Security Best Practices", "url": "https://flask.palletsprojects.com/en/2.3.x/security/", "type": "documentation"}
            ]
        },
        {
            "title": "Career Development",
            "content": "Build your portfolio and prepare for interviews",
            "hours": 2,
            "topics": ["portfolio", "interviews", "career tips"],
            "videos": [
                {"title": "Developer Portfolio Guide", "url": "https://www.youtube.com/watch?v=oKXNk1d_7tU", "duration": "38:24"},
                {"title": "Coding Interview Preparation", "url": "https://www.youtube.com/watch?v=gvHZ-3Z8TeM", "duration": "1:25:17"}
            ],
            "resources": [
                {"title": "LeetCode - Practice Problems", "url": "https://leetcode.com/", "type": "practice"},
                {"title": "Cracking the Coding Interview", "url": "http://www.crackingthecodinginterview.com/", "type": "book"}
            ]
        },
        {
            "title": "Final Project",
            "content": "Build a complete web application showcasing your skills",
            "hours": 4,
            "topics": ["project", "portfolio", "showcase"],
            "videos": [
                {"title": "Full Stack Project Tutorial", "url": "https://www.youtube.com/watch?v=7LNl2JlZKHA", "duration": "2:45:33"},
                {"title": "Building a Portfolio Project", "url": "https://www.youtube.com/watch?v=fYq5PXgSsbE", "duration": "3:12:48"}
            ],
            "resources": [
                {"title": "GitHub Project Showcase", "url": "https://github.com/topics/portfolio", "type": "examples"},
                {"title": "Dev.to - Project Ideas", "url": "https://dev.to/", "type": "community"}
            ]
        }
    ]
    return base_topics[:30]


def get_data_science_topics(experience, interests):
    """Get data science topics based on experience and interests"""
    base_topics = [
        {
            "title": "Python for Data Science",
            "content": "Python basics with focus on data analysis",
            "hours": 2,
            "topics": ["Python", "data types", "numpy basics"],
            "videos": [
                {"title": "Python for Data Science Course", "url": "https://www.youtube.com/watch?v=LHBE6Q9XlzI", "duration": "12:15:00"},
                {"title": "Data Science with Python", "url": "https://www.youtube.com/watch?v=ua-CiDNNj30", "duration": "8:56:19"}
            ],
            "resources": [
                {"title": "Python Data Science Handbook", "url": "https://jakevdp.github.io/PythonDataScienceHandbook/", "type": "book"},
                {"title": "Kaggle Learn - Python", "url": "https://www.kaggle.com/learn/python", "type": "course"}
            ]
        },
        {
            "title": "NumPy Fundamentals",
            "content": "Master numerical computing with NumPy",
            "hours": 2,
            "topics": ["arrays", "mathematical operations", "broadcasting"],
            "videos": [
                {"title": "Complete NumPy Tutorial", "url": "https://www.youtube.com/watch?v=QUT1VHiLmmI", "duration": "58:41"},
                {"title": "NumPy Crash Course", "url": "https://www.youtube.com/watch?v=9JUAPgtkKpI", "duration": "1:24:33"}
            ],
            "resources": [
                {"title": "NumPy Official Documentation", "url": "https://numpy.org/doc/stable/", "type": "documentation"},
                {"title": "NumPy Tutorial - W3Schools", "url": "https://www.w3schools.com/python/numpy/", "type": "tutorial"}
            ]
        },
        {
            "title": "Pandas Basics",
            "content": "Data manipulation and analysis with Pandas",
            "hours": 2.5,
            "topics": ["DataFrames", "Series", "data cleaning"],
            "videos": [
                {"title": "Complete Pandas Tutorial", "url": "https://www.youtube.com/watch?v=vmEHCJofslg", "duration": "1:00:27"},
                {"title": "Pandas Full Course", "url": "https://www.youtube.com/watch?v=PcvsOaixUh8", "duration": "2:31:48"}
            ],
            "resources": [
                {"title": "Pandas Documentation", "url": "https://pandas.pydata.org/docs/", "type": "documentation"},
                {"title": "10 Minutes to Pandas", "url": "https://pandas.pydata.org/docs/user_guide/10min.html", "type": "quickstart"}
            ]
        },
        {
            "title": "Data Visualization with Matplotlib",
            "content": "Create charts and graphs for data visualization",
            "hours": 2,
            "topics": ["plotting", "charts", "visualization"],
            "videos": [
                {"title": "Matplotlib Tutorial", "url": "https://www.youtube.com/watch?v=UO98lJQ3QGI", "duration": "3:10:00"},
                {"title": "Data Visualization with Python", "url": "https://www.youtube.com/watch?v=a9UrKTVEeZA", "duration": "1:32:05"}
            ],
            "resources": [
                {"title": "Matplotlib Documentation", "url": "https://matplotlib.org/stable/contents.html", "type": "documentation"},
                {"title": "Python Graph Gallery", "url": "https://www.python-graph-gallery.com/", "type": "examples"}
            ]
        },
        {
            "title": "Advanced Pandas Operations",
            "content": "Complex data manipulation techniques",
            "hours": 2.5,
            "topics": ["groupby", "merging", "pivoting"],
            "videos": [
                {"title": "Advanced Pandas", "url": "https://www.youtube.com/watch?v=tcRGa2soc-c", "duration": "1:15:00"},
                {"title": "Pandas GroupBy Operations", "url": "https://www.youtube.com/watch?v=qy0fDqoMJx8", "duration": "18:33"}
            ],
            "resources": [
                {"title": "Pandas User Guide - GroupBy", "url": "https://pandas.pydata.org/docs/user_guide/groupby.html", "type": "documentation"},
                {"title": "Real Python - Pandas GroupBy", "url": "https://realpython.com/pandas-groupby/", "type": "article"}
            ]
        },
        {
            "title": "Seaborn for Statistical Plots",
            "content": "Statistical data visualization with Seaborn",
            "hours": 2,
            "topics": ["statistical plots", "seaborn", "styling"],
            "videos": [
                {"title": "Seaborn Tutorial", "url": "https://www.youtube.com/watch?v=6GUZXDef2U0", "duration": "1:07:40"},
                {"title": "Data Visualization with Seaborn", "url": "https://www.youtube.com/watch?v=TLdXM0A7SR8", "duration": "2:13:32"}
            ],
            "resources": [
                {"title": "Seaborn Documentation", "url": "https://seaborn.pydata.org/", "type": "documentation"},
                {"title": "Seaborn Tutorial Gallery", "url": "https://seaborn.pydata.org/tutorial.html", "type": "tutorial"}
            ]
        },
        {
            "title": "Data Cleaning & Preprocessing",
            "content": "Handle missing data and prepare datasets",
            "hours": 2.5,
            "topics": ["missing data", "outliers", "normalization"],
            "videos": [
                {"title": "Data Cleaning Python Tutorial", "url": "https://www.youtube.com/watch?v=bDhvCp3_lYw", "duration": "1:00:47"},
                {"title": "Data Preprocessing Techniques", "url": "https://www.youtube.com/watch?v=GemEDLaFDxc", "duration": "38:52"}
            ],
            "resources": [
                {"title": "Pandas Data Cleaning", "url": "https://pandas.pydata.org/docs/user_guide/missing_data.html", "type": "documentation"},
                {"title": "Kaggle - Data Cleaning Course", "url": "https://www.kaggle.com/learn/data-cleaning", "type": "course"}
            ]
        },
        {
            "title": "Exploratory Data Analysis",
            "content": "Discover patterns and insights in data",
            "hours": 2,
            "topics": ["EDA", "statistics", "correlation"],
            "videos": [
                {"title": "Exploratory Data Analysis Tutorial", "url": "https://www.youtube.com/watch?v=xi0vhXFPegw", "duration": "1:24:33"},
                {"title": "Data Analysis with Python", "url": "https://www.youtube.com/watch?v=GPVsHOlRBBI", "duration": "1:45:22"}
            ],
            "resources": [
                {"title": "EDA Best Practices", "url": "https://towardsdatascience.com/exploratory-data-analysis-8fc1cb20fd15", "type": "article"},
                {"title": "Kaggle EDA Examples", "url": "https://www.kaggle.com/code", "type": "examples"}
            ]
        },
        {
            "title": "Statistical Analysis Basics",
            "content": "Descriptive and inferential statistics",
            "hours": 2.5,
            "topics": ["statistics", "hypothesis testing", "distributions"],
            "videos": [
                {"title": "Statistics for Data Science", "url": "https://www.youtube.com/watch?v=xxpc-HPKN28", "duration": "8:15:42"},
                {"title": "Hypothesis Testing Explained", "url": "https://www.youtube.com/watch?v=0oc49DyA3hU", "duration": "1:12:35"}
            ],
            "resources": [
                {"title": "Khan Academy - Statistics", "url": "https://www.khanacademy.org/math/statistics-probability", "type": "course"},
                {"title": "StatQuest YouTube Channel", "url": "https://www.youtube.com/@statquest", "type": "video series"}
            ]
        },
        {
            "title": "Introduction to Machine Learning",
            "content": "ML concepts and scikit-learn basics",
            "hours": 3,
            "topics": ["ML basics", "scikit-learn", "algorithms"],
            "videos": [
                {"title": "Machine Learning Course", "url": "https://www.youtube.com/watch?v=Gv9_4yMHFhI", "duration": "12:14:52"},
                {"title": "Scikit-learn Tutorial", "url": "https://www.youtube.com/watch?v=pqNCD_5r0IU", "duration": "2:05:17"}
            ],
            "resources": [
                {"title": "Scikit-learn Documentation", "url": "https://scikit-learn.org/stable/", "type": "documentation"},
                {"title": "Machine Learning Mastery", "url": "https://machinelearningmastery.com/start-here/", "type": "blog"}
            ]
        },
        {
            "title": "Linear Regression",
            "content": "Build your first predictive model",
            "hours": 2,
            "topics": ["regression", "prediction", "model evaluation"],
            "videos": [
                {"title": "Linear Regression Tutorial", "url": "https://www.youtube.com/watch?v=7ArmBVF2dCs", "duration": "1:32:18"},
                {"title": "Regression Analysis in Python", "url": "https://www.youtube.com/watch?v=R15LjD8aCicI", "duration": "42:27"}
            ],
            "resources": [
                {"title": "Scikit-learn Linear Models", "url": "https://scikit-learn.org/stable/modules/linear_model.html", "type": "documentation"},
                {"title": "StatQuest - Linear Regression", "url": "https://www.youtube.com/watch?v=nk2CQITm_eo", "type": "video"}
            ]
        },
        {
            "title": "Classification Algorithms",
            "content": "Learn classification techniques",
            "hours": 2.5,
            "topics": ["classification", "decision trees", "logistic regression"],
            "videos": [
                {"title": "Classification Algorithms Tutorial", "url": "https://www.youtube.com/watch?v=7eh4d6sabA0", "duration": "2:15:33"},
                {"title": "Decision Trees Explained", "url": "https://www.youtube.com/watch?v=_L39rN6gz7Y", "duration": "17:22"}
            ],
            "resources": [
                {"title": "Scikit-learn Classification", "url": "https://scikit-learn.org/stable/supervised_learning.html#supervised-learning", "type": "documentation"},
                {"title": "Classification Guide", "url": "https://towardsdatascience.com/machine-learning-classifiers-a5cc4e1b0623", "type": "article"}
            ]
        },
        {
            "title": "Model Evaluation & Validation",
            "content": "Assess model performance and avoid overfitting",
            "hours": 2,
            "topics": ["cross-validation", "metrics", "overfitting"],
            "videos": [
                {"title": "Model Evaluation Techniques", "url": "https://www.youtube.com/watch?v=Kdsp6soqA7o", "duration": "1:08:42"},
                {"title": "Cross-Validation Explained", "url": "https://www.youtube.com/watch?v=fSytzGwwBVw", "duration": "6:04"}
            ],
            "resources": [
                {"title": "Scikit-learn Model Evaluation", "url": "https://scikit-learn.org/stable/modules/model_evaluation.html", "type": "documentation"},
                {"title": "Machine Learning Metrics", "url": "https://towardsdatascience.com/metrics-to-evaluate-your-machine-learning-algorithm-f10ba6e38234", "type": "article"}
            ]
        },
        {
            "title": "Feature Engineering",
            "content": "Create and select meaningful features",
            "hours": 2.5,
            "topics": ["feature selection", "feature creation", "encoding"],
            "videos": [
                {"title": "Feature Engineering Tutorial", "url": "https://www.youtube.com/watch?v=6WDFfaYtN6s", "duration": "1:18:25"},
                {"title": "Feature Selection Techniques", "url": "https://www.youtube.com/watch?v=YaKMeAlHgqQ", "duration": "35:47"}
            ],
            "resources": [
                {"title": "Feature Engineering Guide", "url": "https://machinelearningmastery.com/discover-feature-engineering-how-to-engineer-features-and-how-to-get-good-at-it/", "type": "article"},
                {"title": "Kaggle - Feature Engineering", "url": "https://www.kaggle.com/learn/feature-engineering", "type": "course"}
            ]
        },
        {
            "title": "Clustering & Unsupervised Learning",
            "content": "Discover hidden patterns in data",
            "hours": 2,
            "topics": ["clustering", "k-means", "dimensionality reduction"],
            "videos": [
                {"title": "Clustering Algorithms", "url": "https://www.youtube.com/watch?v=4b5d3muPQmA", "duration": "1:52:33"},
                {"title": "K-Means Clustering Explained", "url": "https://www.youtube.com/watch?v=4b5d3muPQmA", "duration": "17:52"}
            ],
            "resources": [
                {"title": "Scikit-learn Clustering", "url": "https://scikit-learn.org/stable/modules/clustering.html", "type": "documentation"},
                {"title": "Unsupervised Learning Guide", "url": "https://towardsdatascience.com/unsupervised-learning-and-data-clustering-eeecb78b422a", "type": "article"}
            ]
        },
        {
            "title": "Time Series Analysis",
            "content": "Analyze and forecast time-based data",
            "hours": 2.5,
            "topics": ["time series", "forecasting", "trends"],
            "videos": [
                {"title": "Time Series Analysis Python", "url": "https://www.youtube.com/watch?v=e8Yw4alG16Q", "duration": "2:32:47"},
                {"title": "Time Series Forecasting Tutorial", "url": "https://www.youtube.com/watch?v=TvhaHPq6xLU", "duration": "1:15:28"}
            ],
            "resources": [
                {"title": "Time Series Analysis Guide", "url": "https://www.statsmodels.org/stable/user-guide.html#time-series-analysis", "type": "documentation"},
                {"title": "Prophet for Time Series", "url": "https://facebook.github.io/prophet/", "type": "library"}
            ]
        },
        {
            "title": "Web Scraping for Data",
            "content": "Collect data from websites",
            "hours": 2,
            "topics": ["web scraping", "BeautifulSoup", "requests"],
            "videos": [
                {"title": "Web Scraping with Python", "url": "https://www.youtube.com/watch?v=XVv6mJpFOb0", "duration": "1:33:00"},
                {"title": "BeautifulSoup Tutorial", "url": "https://www.youtube.com/watch?v=87Gx3U0BDlo", "duration": "1:05:23"}
            ],
            "resources": [
                {"title": "Beautiful Soup Documentation", "url": "https://www.crummy.com/software/BeautifulSoup/bs4/doc/", "type": "documentation"},
                {"title": "Web Scraping Guide", "url": "https://realpython.com/beautiful-soup-web-scraper-python/", "type": "tutorial"}
            ]
        },
        {
            "title": "Working with APIs",
            "content": "Fetch data from web APIs",
            "hours": 1.5,
            "topics": ["APIs", "JSON", "data collection"],
            "videos": [
                {"title": "Python API Tutorial", "url": "https://www.youtube.com/watch?v=tb8gHvYlCFs", "duration": "1:18:32"},
                {"title": "REST API Basics", "url": "https://www.youtube.com/watch?v=s7wmiS2mSXY", "duration": "52:14"}
            ],
            "resources": [
                {"title": "Requests Library Docs", "url": "https://docs.python-requests.org/", "type": "documentation"},
                {"title": "Public APIs List", "url": "https://github.com/public-apis/public-apis", "type": "resource"}
            ]
        },
        {
            "title": "SQL for Data Analysis",
            "content": "Query databases for data analysis",
            "hours": 2,
            "topics": ["SQL", "queries", "database analysis"],
            "videos": [
                {"title": "SQL for Data Analysis", "url": "https://www.youtube.com/watch?v=7mz73uXD9DA", "duration": "3:56:52"},
                {"title": "Advanced SQL Tutorial", "url": "https://www.youtube.com/watch?v=2Fn0WAyZV0E", "duration": "1:42:15"}
            ],
            "resources": [
                {"title": "Mode SQL Tutorial", "url": "https://mode.com/sql-tutorial/", "type": "tutorial"},
                {"title": "SQLZoo", "url": "https://sqlzoo.net/", "type": "interactive"}
            ]
        },
        {
            "title": "Big Data Basics",
            "content": "Introduction to big data tools",
            "hours": 2.5,
            "topics": ["big data", "distributed computing", "scalability"],
            "videos": [
                {"title": "Big Data Tutorial", "url": "https://www.youtube.com/watch?v=jKCj4BxGTi8", "duration": "9:57:03"},
                {"title": "Apache Spark Tutorial", "url": "https://www.youtube.com/watch?v=_C8kWso4ne4", "duration": "5:19:28"}
            ],
            "resources": [
                {"title": "PySpark Documentation", "url": "https://spark.apache.org/docs/latest/api/python/", "type": "documentation"},
                {"title": "Big Data Guide", "url": "https://www.coursera.org/articles/big-data", "type": "article"}
            ]
        },
        {
            "title": "Deep Learning Introduction",
            "content": "Neural networks with TensorFlow/Keras",
            "hours": 3,
            "topics": ["neural networks", "deep learning", "TensorFlow"],
            "videos": [
                {"title": "Deep Learning Tutorial", "url": "https://www.youtube.com/watch?v=VyWAvY2CF9c", "duration": "3:30:45"},
                {"title": "TensorFlow Full Course", "url": "https://www.youtube.com/watch?v=tPYj3fFJGjk", "duration": "6:52:08"}
            ],
            "resources": [
                {"title": "TensorFlow Documentation", "url": "https://www.tensorflow.org/tutorials", "type": "documentation"},
                {"title": "Keras Documentation", "url": "https://keras.io/", "type": "documentation"}
            ]
        },
        {
            "title": "Natural Language Processing",
            "content": "Analyze text data and build NLP models",
            "hours": 2.5,
            "topics": ["NLP", "text processing", "sentiment analysis"],
            "videos": [
                {"title": "NLP Tutorial Python", "url": "https://www.youtube.com/watch?v=X2vAabgKiuM", "duration": "2:28:42"},
                {"title": "Natural Language Processing Course", "url": "https://www.youtube.com/watch?v=fM4qTMfCoak", "duration": "3:17:52"}
            ],
            "resources": [
                {"title": "NLTK Documentation", "url": "https://www.nltk.org/", "type": "documentation"},
                {"title": "spaCy Documentation", "url": "https://spacy.io/", "type": "documentation"}
            ]
        },
        {
            "title": "Computer Vision Basics",
            "content": "Process and analyze images",
            "hours": 2.5,
            "topics": ["image processing", "OpenCV", "computer vision"],
            "videos": [
                {"title": "Computer Vision Tutorial", "url": "https://www.youtube.com/watch?v=01sAkU_NvOY", "duration": "3:42:15"},
                {"title": "OpenCV Python Tutorial", "url": "https://www.youtube.com/watch?v=oXlwWbU8l2o", "duration": "3:41:42"}
            ],
            "resources": [
                {"title": "OpenCV Documentation", "url": "https://docs.opencv.org/", "type": "documentation"},
                {"title": "PyImageSearch", "url": "https://pyimagesearch.com/", "type": "blog"}
            ]
        },
        {
            "title": "Model Deployment",
            "content": "Deploy ML models to production",
            "hours": 2,
            "topics": ["model deployment", "Flask API", "cloud deployment"],
            "videos": [
                {"title": "Deploy ML Models", "url": "https://www.youtube.com/watch?v=mrExsjcvF4o", "duration": "1:52:33"},
                {"title": "Flask ML API Tutorial", "url": "https://www.youtube.com/watch?v=UbCWoMf80PY", "duration": "48:25"}
            ],
            "resources": [
                {"title": "Flask for ML Deployment", "url": "https://towardsdatascience.com/deploying-machine-learning-models-as-api-using-flask-5614e7b1b2f4", "type": "article"},
                {"title": "Streamlit Documentation", "url": "https://docs.streamlit.io/", "type": "documentation"}
            ]
        },
        {
            "title": "A/B Testing & Experimentation",
            "content": "Design and analyze experiments",
            "hours": 2,
            "topics": ["A/B testing", "experimental design", "statistical significance"],
            "videos": [
                {"title": "A/B Testing Tutorial", "url": "https://www.youtube.com/watch?v=zKp4nWKTGZ4", "duration": "52:18"},
                {"title": "Experimental Design", "url": "https://www.youtube.com/watch?v=OwfQoXoJRUE", "duration": "1:15:42"}
            ],
            "resources": [
                {"title": "A/B Testing Guide", "url": "https://www.optimizely.com/optimization-glossary/ab-testing/", "type": "guide"},
                {"title": "Experimentation Guide", "url": "https://exp-platform.com/", "type": "resource"}
            ]
        },
        {
            "title": "Data Storytelling",
            "content": "Present insights effectively",
            "hours": 2,
            "topics": ["data storytelling", "visualization", "presentation"],
            "videos": [
                {"title": "Data Storytelling Tutorial", "url": "https://www.youtube.com/watch?v=8EMW7io4rSI", "duration": "1:08:33"},
                {"title": "Effective Data Visualization", "url": "https://www.youtube.com/watch?v=Vc47K_7SoJo", "duration": "45:27"}
            ],
            "resources": [
                {"title": "Storytelling with Data", "url": "https://www.storytellingwithdata.com/", "type": "blog"},
                {"title": "Data Visualization Guide", "url": "https://www.tableau.com/learn/articles/data-visualization", "type": "guide"}
            ]
        },
        {
            "title": "Ethics in Data Science",
            "content": "Responsible AI and data ethics",
            "hours": 1.5,
            "topics": ["data ethics", "bias", "privacy"],
            "videos": [
                {"title": "AI Ethics Tutorial", "url": "https://www.youtube.com/watch?v=TU6u4RaFQ5Y", "duration": "52:47"},
                {"title": "Data Privacy Basics", "url": "https://www.youtube.com/watch?v=bZowZqHN7c8", "duration": "38:15"}
            ],
            "resources": [
                {"title": "Ethics in AI", "url": "https://ethics.harvard.edu/themes/ai-and-ethics", "type": "article"},
                {"title": "Data Ethics Framework", "url": "https://www.gov.uk/government/publications/data-ethics-framework", "type": "guide"}
            ]
        },
        {
            "title": "Advanced Visualization",
            "content": "Interactive visualizations with Plotly",
            "hours": 2,
            "topics": ["interactive plots", "Plotly", "dashboards"],
            "videos": [
                {"title": "Plotly Tutorial", "url": "https://www.youtube.com/watch?v=GGL6U0k8WYA", "duration": "1:42:23"},
                {"title": "Interactive Dashboards", "url": "https://www.youtube.com/watch?v=hSPmj7mK6ng", "duration": "2:15:38"}
            ],
            "resources": [
                {"title": "Plotly Documentation", "url": "https://plotly.com/python/", "type": "documentation"},
                {"title": "Dash Documentation", "url": "https://dash.plotly.com/", "type": "documentation"}
            ]
        },
        {
            "title": "Portfolio Development",
            "content": "Build a data science portfolio",
            "hours": 2.5,
            "topics": ["portfolio", "GitHub", "project showcase"],
            "videos": [
                {"title": "Data Science Portfolio Guide", "url": "https://www.youtube.com/watch?v=xrhPjE7wHas", "duration": "1:18:42"},
                {"title": "GitHub for Data Scientists", "url": "https://www.youtube.com/watch?v=8Dd7KRpKeaE", "duration": "52:33"}
            ],
            "resources": [
                {"title": "Portfolio Examples", "url": "https://www.kaggle.com/code", "type": "examples"},
                {"title": "Data Science Portfolio Guide", "url": "https://towardsdatascience.com/how-to-build-a-data-science-portfolio-5f566517c79c", "type": "article"}
            ]
        },
        {
            "title": "Capstone Project",
            "content": "Complete end-to-end data science project",
            "hours": 4,
            "topics": ["capstone", "end-to-end project", "presentation"],
            "videos": [
                {"title": "End-to-End ML Project", "url": "https://www.youtube.com/watch?v=fiz1ORTBGpY", "duration": "3:42:18"},
                {"title": "Data Science Project Tutorial", "url": "https://www.youtube.com/watch?v=MpF9HENQjDo", "duration": "2:58:47"}
            ],
            "resources": [
                {"title": "Kaggle Competitions", "url": "https://www.kaggle.com/competitions", "type": "platform"},
                {"title": "Project Ideas", "url": "https://www.dataquest.io/blog/data-science-projects/", "type": "guide"}
            ]
        }
    ]
    return base_topics[:30]


def get_combined_topics(experience, interests):
    """Get combined topics for both software development and data science"""
    software_topics = get_software_topics(experience, interests)[:15]
    data_topics = get_data_science_topics(experience, interests)[:15]
    
    # Interleave topics for balanced learning
    combined = []
    for i in range(15):
        combined.append(software_topics[i])
        combined.append(data_topics[i])
    
    return combined
