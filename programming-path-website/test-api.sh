#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🧪 Testing Programming Learning Path API${NC}"
echo -e "${BLUE}=======================================${NC}"

# Function to test API endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local data=$3
    local description=$4
    
    echo -e "\n${YELLOW}Testing: ${description}${NC}"
    echo -e "Endpoint: ${method} ${endpoint}"
    
    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "\n%{http_code}" "http://localhost:5001${endpoint}")
    else
        response=$(curl -s -w "\n%{http_code}" -X "$method" \
            -H "Content-Type: application/json" \
            -d "$data" \
            "http://localhost:5001${endpoint}")
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n -1)
    
    if [ "$http_code" -eq 200 ] || [ "$http_code" -eq 201 ]; then
        echo -e "${GREEN}✓ Success (HTTP $http_code)${NC}"
        echo "Response: $body" | head -c 200
        echo "..."
    else
        echo -e "${RED}✗ Failed (HTTP $http_code)${NC}"
        echo "Response: $body"
    fi
}

# Check if backend is running
echo -e "${YELLOW}Checking if backend is running...${NC}"
if curl -s http://localhost:5001/api/health > /dev/null; then
    echo -e "${GREEN}✓ Backend is running${NC}"
else
    echo -e "${RED}✗ Backend is not running. Please start it first:${NC}"
    echo -e "  ${BLUE}cd backend && python3 app.py${NC}"
    exit 1
fi

# Test API endpoints
test_endpoint "GET" "/api/health" "" "Health Check"

# Test survey submission với đầy đủ 22 câu hỏi
survey_data='{
    "role": "software",
    "experience_level": "beginner",
    "motivation": "career",
    "time_commitment": "2hours",
    "devices": ["laptop", "desktop"],
    "learning_style": "practice",
    "interests": ["basic_syntax", "functions"],
    "programming_experience": "little",
    "preferred_environment": "online",
    "project_type": "web_apps",
    "learning_pace": "moderate",
    "confidence_level": "uncertain",
    "career_impact": "agree",
    "stress_level": "neutral",
    "uncertainty": "agree",
    "barriers": "lack_time",
    "python_benefits": "often",
    "quick_learning": "no",
    "self_taught": "yes",
    "data_growth": "yes",
    "salary_potential": "yes",
    "age_range": "25_34"
}'

test_endpoint "POST" "/api/survey" "$survey_data" "Survey Submission"

# Test Google auth (mock)
auth_data='{
    "token": "mock-token-123",
    "survey_id": 1
}'

test_endpoint "POST" "/api/auth/google" "$auth_data" "Google Authentication (Mock)"

echo -e "\n${BLUE}🎉 API testing completed!${NC}"
echo -e "${YELLOW}Note: Some tests may fail if database is not properly initialized.${NC}"