AI-Powered Job Portal

An AI-driven recruitment platform built using the MERN Stack that streamlines the hiring process for both recruiters and candidates. The platform provides secure authentication, job management, application tracking, AI-powered job recommendations, resume management, interview scheduling, and analytics dashboards.

Features
Candidate Features
User Registration & Login
JWT Authentication
Candidate Dashboard
Browse Available Jobs
Apply for Jobs
Resume Upload & Management
Profile Management
AI-Based Job Recommendations
Application Tracking
Recruiter Features
Recruiter Registration & Login
Create, Update & Delete Jobs
View Posted Jobs
Manage Applicants
Schedule Interviews
Recruiter Dashboard
Hiring Analytics
AI Features
Skill-Based Job Recommendation Engine
Candidate-Job Matching Score
Personalized Job Suggestions
Tech Stack
Frontend
React.js
Vite
Tailwind CSS
React Router DOM
Axios
Backend
Node.js
Express.js
MongoDB Atlas
Mongoose
JWT Authentication
Multer
Deployment
Frontend: Vercel
Backend: Railway
Database: MongoDB Atlas
Project Structure
AI-Powered-Job-Portal/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── component/
│   │   ├── context/
│   │   ├── api/
│   │   └── App.jsx
│   │
│   ├── public/
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
│
├── README.md
└── package.json

cd AI-Powered-Job-Portal
Backend Setup

Navigate to server folder:

cd server

Install dependencies:

npm install

Create a .env file:

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

OPENAI_API_KEY=your_openai_key

Run backend:

npm run dev

Server runs on:

http://localhost:5000
Frontend Setup

Navigate to client folder:

cd client

Install dependencies:

npm install

Create .env file:

VITE_API_URL=http://localhost:5000/api

Run frontend:

npm run dev

Frontend runs on:

http://localhost:5173
API Endpoints
Authentication
POST /api/auth/register
POST /api/auth/login
Jobs
GET    /api/jobs
GET    /api/jobs/:id
POST   /api/jobs
PUT    /api/jobs/:id
DELETE /api/jobs/:id
Applications
POST /api/applications/apply
GET  /api/applications/my-applications
Profile
GET /api/profile
PUT /api/profile
Resume
POST /api/resume/upload
GET  /api/resume
AI Recommendation
GET /api/jobs/recommendations
Dashboard
GET /api/dashboard/recruiter
GET /api/dashboard/candidate
Authentication

The application uses JWT-based authentication.

Example Request Header:

Authorization: Bearer <token>
Environment Variables
Frontend
VITE_API_URL=https://your-backend-url/api
Backend
PORT=5000
MONGO_URI=
JWT_SECRET=
OPENAI_API_KEY=
Deployment
Frontend (Vercel)

Set Environment Variable:

VITE_API_URL=https://your-railway-backend-url/api

Deploy:

vercel --prod
Backend (Railway)

Set Environment Variables:

PORT
MONGO_URI
JWT_SECRET
OPENAI_API_KEY

Deploy directly from GitHub repository.

Future Enhancements
AI Resume Parsing
AI Interview Question Generation
Email Notifications
Video Interview Integration
Company Profiles
Advanced Search & Filters
Real-Time Chat System
AI Resume Scoring
Screenshots
Home Page
Browse jobs
Search & filter jobs
Candidate Dashboard
Recommended jobs
Application tracking
Recruiter Dashboard
Manage jobs
View applicants
Schedule interviews
Author

Dev Patel


License

This project is licensed under the MIT License.
