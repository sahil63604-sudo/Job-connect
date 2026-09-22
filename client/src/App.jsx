import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home';
import Login from './pages/Login';
import { Register } from './pages/Register';
import Navbar from './components/Navbar';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import MyApplications from './pages/MyApplications';
import RecruiterDashboard from './pages/RecruiterDashboard';
import Applicants from './pages/Applicants';
import CreateJob from './pages/CreateJob';
import EditJob from './pages/EditJob';
import AdminUsers from './pages/AdminUsers';
import AdminJobs from './pages/AdminJobs';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/myapplications" element={<MyApplications />} />
          <Route path="/recruiterDashboard" element={<RecruiterDashboard />} />

          <Route
            path="/recruiterDashboard/create-job"
            element={<CreateJob />}
          />
          <Route path="/recruiterDashboard/applicants/:jobId" element={<Applicants />} />
          <Route path="/recruiterDashboard/edit-job/:jobId" element={<EditJob />} />

          <Route path='/jobs/:jobId' element={<JobDetails />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path='/admin/users' element={<AdminUsers />} />
          <Route path="/admin/jobs" element={<AdminJobs />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App