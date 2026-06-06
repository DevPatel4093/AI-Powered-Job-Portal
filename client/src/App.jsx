import {
 BrowserRouter,
 Routes,
 Route
}
from "react-router-dom";

import Login from "./pages/Login";

import Jobs from "./pages/Jobs";

import Register from "./pages/Register";

import CandidateDashboard from "./pages/CandidateDashboard";

import Navbar from "./component/Navbar";

import RecruiterDashboard from "./pages/RecruiterDashboard";

import CreateJob from "./pages/CreateJob";

import Profile from "./pages/Profile";

import Applicants from "./pages/Applicants";

import ProtectedRoute from "./component/ProtectedRoute";


function App() {

 return (

  <BrowserRouter>

   <Routes>

    <Route
     path="/"
     element={<Jobs />}
    />

    <Route
     path="/login"
     element={<Login />}
    />

    <Route
      path="/register"
      element={<Register />}
    />

    <Route
      path="/candidate"
      element={
        <ProtectedRoute role="candidate">
          <CandidateDashboard />
        </ProtectedRoute>
      }
    />
    
    <Route
      path="/dashboard"
      element={<CandidateDashboard />}
    />

    <Route
      path="/recruiter-dashboard"
      element={
      <ProtectedRoute role="recruiter">
        <RecruiterDashboard />
      </ProtectedRoute>
     }
    />

    <Route
      path="/create-job"
      element={<CreateJob />}
    />

    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />

    <Route
      path="/applicants/:jobId"
      element={
        <ProtectedRoute role="recruiter">
          <Applicants />
        </ProtectedRoute>
      }
    />

    </Routes>
  </BrowserRouter>

 );
}

export default App;