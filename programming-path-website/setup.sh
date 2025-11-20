#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Programming Learning Path Website${NC}"
echo -e "${BLUE}======================================${NC}"

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check Python
if command_exists python3; then
    echo -e "${GREEN}✓ Python found${NC}"
    PYTHON_CMD="python3"
elif command_exists python; then
    echo -e "${GREEN}✓ Python found${NC}"
    PYTHON_CMD="python"
else
    echo -e "${RED}✗ Python not found. Please install Python 3.8+${NC}"
    exit 1
fi

# Check Node.js
if command_exists node; then
    echo -e "${GREEN}✓ Node.js found${NC}"
else
    echo -e "${RED}✗ Node.js not found. Please install Node.js 18+${NC}"
    exit 1
fi

# Check pip
if command_exists pip3; then
    PIP_CMD="pip3"
elif command_exists pip; then
    PIP_CMD="pip"
else
    echo -e "${RED}✗ pip not found. Please install pip${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}📦 Installing dependencies...${NC}"

# Install backend dependencies
echo -e "${BLUE}Installing backend dependencies...${NC}"
cd backend
if [ -f "requirements.txt" ]; then
    $PIP_CMD install -r requirements.txt
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Backend dependencies installed${NC}"
    else
        echo -e "${RED}✗ Failed to install backend dependencies${NC}"
        exit 1
    fi
else
    echo -e "${RED}✗ requirements.txt not found in backend directory${NC}"
    exit 1
fi

# Install frontend dependencies
echo -e "${BLUE}Installing frontend dependencies...${NC}"
cd ../frontend
if [ -f "package.json" ]; then
    npm install
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
    else
        echo -e "${RED}✗ Failed to install frontend dependencies${NC}"
        exit 1
    fi
else
    echo -e "${RED}✗ package.json not found in frontend directory${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}🎉 Installation completed successfully!${NC}"
echo ""
echo -e "${YELLOW}📋 Next steps:${NC}"
echo -e "1. Start backend:  ${BLUE}cd backend && $PYTHON_CMD app.py${NC}"
echo -e "2. Start frontend: ${BLUE}cd frontend && npm run dev${NC}"
echo -e "3. Open browser:   ${BLUE}http://localhost:3000${NC}"
echo ""
echo -e "${YELLOW}Or run both simultaneously:${NC}"
echo -e "${BLUE}./run-dev.sh${NC}"