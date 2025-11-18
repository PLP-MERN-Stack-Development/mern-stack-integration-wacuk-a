# 🛡️ SafeSpace Kenya - MERN Stack Domestic Violence Awareness Platform

![MERN Stack](https://img.shields.io/badge/MERN-Full%20Stack-green)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-22.21.0-green)
![MongoDB](https://img.shields.io/badge/MongoDB-5.0+-green)

A full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that provides a safe platform for domestic violence survivors in Kenya to share stories, access resources, and find support.

## 🎯 Project Overview

**SafeSpace Kenya** transforms the traditional blog concept into a meaningful social impact platform addressing domestic violence awareness in Kenya. The application demonstrates seamless integration between frontend and backend components with a focus on safety, privacy, and user support.

### 🌍 Kenyan Context Features
- Emergency contacts specific to Kenya (1195 GBV hotline, 999 police, 116 Childline)
- County-specific support resources
- Local organizations and partners
- Culturally relevant content and approach

## 🚀 Features

### Core Functionality
- **Story Sharing**: Safe, anonymous platform for survivors to share experiences
- **Resource Directory**: Comprehensive list of support services across Kenya
- **Emergency Contacts**: Prominently displayed 24/7 helplines
- **User Roles**: Differentiated access for survivors, counselors, advocates, legal experts, and healthcare workers

### Advanced Features
- **Search & Filter**: Find stories by keywords, categories, and author roles
- **Anonymous Posting**: Option to share stories without revealing identity
- **Trigger Warnings**: Content warnings for sensitive material
- **Safety-First Design**: Emergency resources always accessible
- **Responsive UI**: Works seamlessly on desktop and mobile devices

## 🛠️ Technology Stack

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication (ready for implementation)
- **Express Validator** for input validation
- **CORS, Helmet, Rate Limiting** for security

### Frontend
- **React 18** with functional components and hooks
- **React Router DOM** for navigation
- **Context API** for state management
- **Axios** for API communication
- **Vite** for fast development and building
- **CSS3** with responsive design

## 📁 Project Structure
mern-stack-assignment/
├── server/ # Backend application
│ ├── config/ # Database configuration
│ ├── controllers/ # Route controllers
│ ├── middleware/ # Custom middleware
│ ├── models/ # MongoDB models
│ ├── routes/ # API routes
│ ├── uploads/ # File uploads directory
│ ├── .env # Environment variables
│ └── server.js # Entry point
├── client/ # Frontend application
│ ├── public/ # Static files
│ ├── src/
│ │ ├── components/ # Reusable components
│ │ ├── context/ # React Context providers
│ │ ├── hooks/ # Custom hooks
│ │ ├── pages/ # Page components
│ │ ├── services/ # API services
│ │ ├── App.jsx # Main App component
│ │ └── main.jsx # React entry point
│ ├── .env # Client environment variables
│ └── vite.config.js # Vite configuration
└── README.md # Project documentation

text

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd mern-stack-assignment
2. Backend Setup
bash
cd server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and other settings

# Start the development server
npm run dev
The backend server will run on http://localhost:5000

3. Frontend Setup
bash
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
The frontend application will run on http://localhost:5173

🔌 API Endpoints
Posts/Stories
GET /api/posts - Get all stories (with pagination ready)

GET /api/posts/:id - Get a specific story

POST /api/posts - Create a new story

PUT /api/posts/:id - Update a story

DELETE /api/posts/:id - Delete a story

Categories
GET /api/categories - Get all categories

POST /api/categories - Create a new category

Health Check
GET /api/health - Server status check

🎯 Assignment Requirements Met
✅ Task 1: Project Setup
Clear directory structure for client and server

MongoDB connection with Mongoose

Express.js server with middleware

React front-end with Vite

Environment variables configuration

✅ Task 2: Back-End Development
Complete RESTful API implementation

Mongoose models with proper relationships

Input validation with express-validator

Comprehensive error handling

✅ Task 3: Front-End Development
React components for all views

React Router for navigation

State management with Context API and hooks

Custom API hook implementation

✅ Task 4: Integration and Data Flow
API service layer with Axios

Global state management

Form validation and handling

Loading and error states

✅ Task 5: Advanced Features
Search and filtering functionality

User role system

Anonymous posting

Trigger warnings

Kenyan context localization

🌟 Unique Features
Social Impact Focus
Domestic violence awareness platform

Kenyan emergency contacts and resources

Safety-first design principles

Culturally appropriate content

Technical Excellence
Clean, maintainable code structure

Comprehensive error handling

Responsive design

Professional UI/UX

🧪 Testing
Backend Testing
bash
cd server
npm run dev
# Server should start on port 5000
Frontend Testing
bash
cd client
npm run dev
# Application should start on port 5173
API Testing
Use tools like Postman or curl to test endpoints:

bash
# Health check
curl http://localhost:5000/api/health

# Get all stories
curl http://localhost:5000/api/posts
📸 Application Screenshots
(Screenshots should be added here showing:)

Homepage with emergency contacts

Stories list with search/filter

Story detail view

Share story form

Resources page

About page

👥 Contributors
Developed as a MERN stack assignment demonstration

Focus on social impact and technical excellence

📄 License
This project is developed for educational purposes as part of a MERN stack assignment.

🆘 Emergency Resources
Kenya National GBV Hotline: 1195
Police Emergency: 999
Childline Kenya: 116

Remember: You are not alone. Help is available.
