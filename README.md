# AI-Powered Job Portal

An AI-driven recruitment platform built using the MERN Stack that streamlines the hiring process for both recruiters and candidates. The platform provides secure authentication, job management, application tracking, AI-powered job recommendations, resume management, interview scheduling, and analytics dashboards.

---

## Features

### Candidate Features

* User Registration & Login
* JWT Authentication
* Candidate Dashboard
* Browse Available Jobs
* Apply for Jobs
* Resume Upload & Management
* Profile Management
* AI-Based Job Recommendations
* Application Tracking

### Recruiter Features

* Recruiter Registration & Login
* Create, Update & Delete Jobs
* View Posted Jobs
* Manage Applicants
* Schedule Interviews
* Recruiter Dashboard
* Hiring Analytics

### AI Features

* Skill-Based Job Recommendation Engine
* Candidate-Job Matching Score
* Personalized Job Suggestions

---

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Axios

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* Multer

### Deployment

* Frontend: Vercel
* Backend: Railway
* Database: MongoDB Atlas

---

## Project Structure

```bash
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
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/your-username/AI-Powered-Job-Portal.git

cd AI-Powered-Job-Portal
```

---

## Backend Setup

Navigate to server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

OPENAI_API_KEY=your_openai_key
```

Run backend:

```bash
npm run dev
```

Server runs on:

```bash
http://localhost:5000
```

---

## Frontend Setup

Navigate to client folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Jobs

```http
GET    /api/jobs
GET    /api/jobs/:id
POST   /api/jobs
PUT    /api/jobs/:id
DELETE /api/jobs/:id
```

### Applications

```http
POST /api/applications/apply
GET  /api/applications/my-applications
```

### Profile

```http
GET /api/profile
PUT /api/profile
```

### Resume

```http
POST /api/resume/upload
GET  /api/resume
```

### AI Recommendation

```http
GET /api/jobs/recommendations
```

### Dashboard

```http
GET /api/dashboard/recruiter
GET /api/dashboard/candidate
```

---

## Authentication

The application uses JWT-based authentication.

Example Request Header:

```http
Authorization: Bearer <token>
```

---

## Environment Variables

### Frontend

```env
VITE_API_URL=https://your-backend-url/api
```

### Backend

```env
PORT=5000
MONGO_URI=
JWT_SECRET=
OPENAI_API_KEY=
```

---

## Deployment

### Frontend (Vercel)

Set Environment Variable:

```env
VITE_API_URL=https://your-railway-backend-url/api
```

Deploy:

```bash
vercel --prod
```

### Backend (Railway)

Set Environment Variables:

```env
PORT
MONGO_URI
JWT_SECRET
OPENAI_API_KEY
```

Deploy directly from GitHub repository.

---

## Future Enhancements

* AI Resume Parsing
* AI Interview Question Generation
* Email Notifications
* Video Interview Integration
* Company Profiles
* Advanced Search & Filters
* Real-Time Chat System
* AI Resume Scoring

---

## Screenshots

### Home Page

* Browse jobs
* Search & filter jobs

### Candidate Dashboard

* Recommended jobs
* Application tracking

### Recruiter Dashboard

* Manage jobs
* View applicants
* Schedule interviews

---

## Author

**Dev Patel**

---

## License

This project is licensed under the MIT License.
