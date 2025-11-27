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
        {"title": "Frontend Integration", "content": "Connect frontend with backend APIs", "hours": 2, "topics": ["AJAX", "fetch API", "integration"], "videos": [], "resources": []},
        {"title": "Authentication & Security", "content": "Implement user authentication and security", "hours": 2.5, "topics": ["authentication", "security", "JWT"], "videos": [], "resources": []},
        {"title": "Testing Your Code", "content": "Write unit tests and test your applications", "hours": 2, "topics": ["unit testing", "pytest", "TDD"], "videos": [], "resources": []},
        {"title": "Version Control with Git", "content": "Master Git for code versioning", "hours": 1.5, "topics": ["Git", "GitHub", "version control"], "videos": [], "resources": []},
        {"title": "Deployment Basics", "content": "Deploy your web application to the cloud", "hours": 2, "topics": ["deployment", "cloud", "hosting"], "videos": [], "resources": []},
        {"title": "Advanced Python Features", "content": "Explore decorators, generators, and context managers", "hours": 2.5, "topics": ["decorators", "generators", "context managers"], "videos": [], "resources": []},
        {"title": "Working with APIs", "content": "Consume third-party APIs and web services", "hours": 2, "topics": ["API consumption", "requests library", "web services"], "videos": [], "resources": []},
        {"title": "Database Relationships", "content": "Advanced database operations and relationships", "hours": 2.5, "topics": ["foreign keys", "joins", "relationships"], "videos": [], "resources": []},
        {"title": "Frontend Framework Basics", "content": "Introduction to React or Vue.js", "hours": 3, "topics": ["React", "components", "state management"], "videos": [], "resources": []},
        {"title": "Performance Optimization", "content": "Optimize your Python applications", "hours": 2, "topics": ["performance", "optimization", "profiling"], "videos": [], "resources": []},
        {"title": "Logging & Monitoring", "content": "Implement logging and application monitoring", "hours": 1.5, "topics": ["logging", "monitoring", "debugging"], "videos": [], "resources": []},
        {"title": "Code Quality & Best Practices", "content": "Write clean, maintainable code", "hours": 2, "topics": ["code quality", "best practices", "PEP8"], "videos": [], "resources": []},
        {"title": "Package Management", "content": "Manage dependencies and create packages", "hours": 1.5, "topics": ["pip", "virtual environments", "packaging"], "videos": [], "resources": []},
        {"title": "Asynchronous Programming", "content": "Learn async/await and concurrent programming", "hours": 2.5, "topics": ["asyncio", "concurrency", "async/await"], "videos": [], "resources": []},
        {"title": "Microservices Basics", "content": "Introduction to microservices architecture", "hours": 2, "topics": ["microservices", "architecture", "design patterns"], "videos": [], "resources": []},
        {"title": "Container Basics", "content": "Introduction to Docker and containerization", "hours": 2, "topics": ["Docker", "containers", "deployment"], "videos": [], "resources": []},
        {"title": "DevOps Fundamentals", "content": "CI/CD pipelines and automation", "hours": 2.5, "topics": ["CI/CD", "automation", "DevOps"], "videos": [], "resources": []},
        {"title": "Scalability Concepts", "content": "Design scalable applications", "hours": 2, "topics": ["scalability", "load balancing", "caching"], "videos": [], "resources": []},
        {"title": "Security Best Practices", "content": "Secure coding practices and common vulnerabilities", "hours": 2, "topics": ["security", "vulnerabilities", "OWASP"], "videos": [], "resources": []},
        {"title": "Career Development", "content": "Build your portfolio and prepare for interviews", "hours": 2, "topics": ["portfolio", "interviews", "career tips"], "videos": [], "resources": []},
        {"title": "Final Project", "content": "Build a complete web application showcasing your skills", "hours": 4, "topics": ["project", "portfolio", "showcase"], "videos": [], "resources": []}
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
        {"title": "Data Cleaning & Preprocessing", "content": "Handle missing data and prepare datasets", "hours": 2.5, "topics": ["missing data", "outliers", "normalization"], "videos": [], "resources": []},
        {"title": "Exploratory Data Analysis", "content": "Discover patterns and insights in data", "hours": 2, "topics": ["EDA", "statistics", "correlation"], "videos": [], "resources": []},
        {"title": "Statistical Analysis Basics", "content": "Descriptive and inferential statistics", "hours": 2.5, "topics": ["statistics", "hypothesis testing", "distributions"], "videos": [], "resources": []},
        {"title": "Introduction to Machine Learning", "content": "ML concepts and scikit-learn basics", "hours": 3, "topics": ["ML basics", "scikit-learn", "algorithms"], "videos": [], "resources": []},
        {"title": "Linear Regression", "content": "Build your first predictive model", "hours": 2, "topics": ["regression", "prediction", "model evaluation"], "videos": [], "resources": []},
        {"title": "Classification Algorithms", "content": "Learn classification techniques", "hours": 2.5, "topics": ["classification", "decision trees", "logistic regression"], "videos": [], "resources": []},
        {"title": "Model Evaluation & Validation", "content": "Assess model performance and avoid overfitting", "hours": 2, "topics": ["cross-validation", "metrics", "overfitting"], "videos": [], "resources": []},
        {"title": "Feature Engineering", "content": "Create and select meaningful features", "hours": 2.5, "topics": ["feature selection", "feature creation", "encoding"], "videos": [], "resources": []},
        {"title": "Clustering & Unsupervised Learning", "content": "Discover hidden patterns in data", "hours": 2, "topics": ["clustering", "k-means", "dimensionality reduction"], "videos": [], "resources": []},
        {"title": "Time Series Analysis", "content": "Analyze and forecast time-based data", "hours": 2.5, "topics": ["time series", "forecasting", "trends"], "videos": [], "resources": []},
        {"title": "Web Scraping for Data", "content": "Collect data from websites", "hours": 2, "topics": ["web scraping", "BeautifulSoup", "requests"], "videos": [], "resources": []},
        {"title": "Working with APIs", "content": "Fetch data from web APIs", "hours": 1.5, "topics": ["APIs", "JSON", "data collection"], "videos": [], "resources": []},
        {"title": "SQL for Data Analysis", "content": "Query databases for data analysis", "hours": 2, "topics": ["SQL", "queries", "database analysis"], "videos": [], "resources": []},
        {"title": "Big Data Basics", "content": "Introduction to big data tools", "hours": 2.5, "topics": ["big data", "distributed computing", "scalability"], "videos": [], "resources": []},
        {"title": "Deep Learning Introduction", "content": "Neural networks with TensorFlow/Keras", "hours": 3, "topics": ["neural networks", "deep learning", "TensorFlow"], "videos": [], "resources": []},
        {"title": "Natural Language Processing", "content": "Analyze text data and build NLP models", "hours": 2.5, "topics": ["NLP", "text processing", "sentiment analysis"], "videos": [], "resources": []},
        {"title": "Computer Vision Basics", "content": "Process and analyze images", "hours": 2.5, "topics": ["image processing", "OpenCV", "computer vision"], "videos": [], "resources": []},
        {"title": "Model Deployment", "content": "Deploy ML models to production", "hours": 2, "topics": ["model deployment", "Flask API", "cloud deployment"], "videos": [], "resources": []},
        {"title": "A/B Testing & Experimentation", "content": "Design and analyze experiments", "hours": 2, "topics": ["A/B testing", "experimental design", "statistical significance"], "videos": [], "resources": []},
        {"title": "Data Storytelling", "content": "Present insights effectively", "hours": 2, "topics": ["data storytelling", "visualization", "presentation"], "videos": [], "resources": []},
        {"title": "Ethics in Data Science", "content": "Responsible AI and data ethics", "hours": 1.5, "topics": ["data ethics", "bias", "privacy"], "videos": [], "resources": []},
        {"title": "Advanced Visualization", "content": "Interactive visualizations with Plotly", "hours": 2, "topics": ["interactive plots", "Plotly", "dashboards"], "videos": [], "resources": []},
        {"title": "Portfolio Development", "content": "Build a data science portfolio", "hours": 2.5, "topics": ["portfolio", "GitHub", "project showcase"], "videos": [], "resources": []},
        {"title": "Capstone Project", "content": "Complete end-to-end data science project", "hours": 4, "topics": ["capstone", "end-to-end project", "presentation"], "videos": [], "resources": []}
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
