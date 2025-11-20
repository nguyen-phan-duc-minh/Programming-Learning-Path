#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting Programming Learning Path Website${NC}"
echo -e "${BLUE}=============================================${NC}"

# Function to kill background processes on exit
cleanup() {
    echo -e "\n${YELLOW}Stopping servers...${NC}"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

# Set up trap to catch Ctrl+C
trap cleanup INT

# Determine Python command
if command -v python3 >/dev/null 2>&1; then
    PYTHON_CMD="python3"
else
    PYTHON_CMD="python"
fi

echo -e "${BLUE}Starting backend server...${NC}"
cd backend
$PYTHON_CMD app.py &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

echo -e "${BLUE}Starting frontend server...${NC}"
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo -e "${GREEN}✅ Both servers started successfully!${NC}"
echo ""
echo -e "${YELLOW}🔗 URLs:${NC}"
echo -e "Frontend: ${BLUE}http://localhost:3000${NC}"
echo -e "Backend:  ${BLUE}http://localhost:5000${NC}"
echo -e "API Health: ${BLUE}http://localhost:5000/api/health${NC}"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop both servers${NC}"

# Wait for processes to finish
wait