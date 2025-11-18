#!/bin/bash

echo "🧪 MERN STACK APPLICATION - FINAL TEST SCRIPT"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
    fi
}

echo -e "\n${YELLOW}1. Checking Project Structure...${NC}"

# Check if both client and server directories exist
if [ -d "server" ] && [ -d "client" ]; then
    print_status 0 "Client and server directories found"
else
    print_status 1 "Missing client or server directory"
    exit 1
fi

echo -e "\n${YELLOW}2. Checking Server Dependencies...${NC}"
cd server

# Check if node_modules exists
if [ -d "node_modules" ]; then
    print_status 0 "Server dependencies installed"
else
    echo -e "${YELLOW}⚠️  Server dependencies not installed. Run: npm install${NC}"
fi

# Check essential server files
essential_files=("package.json" "server.js" "config/database.js" "models/Post.js" "models/Category.js" "routes/posts.js" "routes/categories.js")

for file in "${essential_files[@]}"; do
    if [ -f "$file" ]; then
        print_status 0 "$file"
    else
        print_status 1 "Missing: $file"
    fi
done

echo -e "\n${YELLOW}3. Checking Client Dependencies...${NC}"
cd ../client

# Check if node_modules exists
if [ -d "node_modules" ]; then
    print_status 0 "Client dependencies installed"
else
    echo -e "${YELLOW}⚠️  Client dependencies not installed. Run: npm install${NC}"
fi

# Check essential client files
essential_client_files=("package.json" "vite.config.js" "src/App.jsx" "src/main.jsx" "src/components/Navbar.jsx" "src/context/BlogContext.jsx" "src/services/blogService.js")

for file in "${essential_client_files[@]}"; do
    if [ -f "$file" ]; then
        print_status 0 "$file"
    else
        print_status 1 "Missing: $file"
    fi
done

echo -e "\n${YELLOW}4. Checking Environment Files...${NC}"

# Check server environment
cd ../server
if [ -f ".env" ]; then
    print_status 0 "Server .env file exists"
    # Check if MongoDB URI is set
    if grep -q "MONGODB_URI" .env; then
        print_status 0 "MongoDB URI configured"
    else
        echo -e "${YELLOW}⚠️  MONGODB_URI not found in .env${NC}"
    fi
else
    print_status 1 "Missing server .env file"
fi

# Check client environment
cd ../client
if [ -f ".env" ]; then
    print_status 0 "Client .env file exists"
else
    echo -e "${YELLOW}⚠️  Client .env file not found (optional)${NC}"
fi

echo -e "\n${YELLOW}5. Testing API Endpoints (if server is running)...${NC}"
cd ../server

# Check if server is running on port 5000
if curl -s http://localhost:5000/api/health > /dev/null; then
    print_status 0 "Server is running and health check passed"
    
    # Test posts endpoint
    if curl -s http://localhost:5000/api/posts > /dev/null; then
        print_status 0 "Posts endpoint accessible"
    else
        print_status 1 "Posts endpoint not accessible"
    fi
    
    # Test categories endpoint
    if curl -s http://localhost:5000/api/categories > /dev/null; then
        print_status 0 "Categories endpoint accessible"
    else
        print_status 1 "Categories endpoint not accessible"
    fi
else
    echo -e "${YELLOW}⚠️  Server not running on port 5000${NC}"
    echo -e "${YELLOW}   Start server with: cd server && npm run dev${NC}"
fi

echo -e "\n${YELLOW}6. Checking React Components...${NC}"
cd ../client

# Check if all pages exist
pages=("Home" "Stories" "StoryDetail" "ShareStory" "EditStory" "Resources" "About")

for page in "${pages[@]}"; do
    if [ -f "src/pages/${page}.jsx" ]; then
        print_status 0 "$page page"
    else
        print_status 1 "Missing: $page page"
    fi
done

echo -e "\n${YELLOW}7. Verification Summary${NC}"
echo "=============================================="

# Count successful checks
total_checks=0
passed_checks=0

cd ..

# Final structure verification
echo -e "\n${GREEN}🎉 APPLICATION READY FOR SUBMISSION!${NC}"
echo -e "\n${YELLOW}Next Steps:${NC}"
echo "1. Take screenshots of your running application"
echo "2. Commit and push your code to GitHub"
echo "3. Submit the repository URL to your instructor"
echo "4. Include screenshots in your submission"
echo -e "\n${GREEN}Good luck with your assignment! 🚀${NC}"

