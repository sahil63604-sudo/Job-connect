import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './pages/Home';
import Login  from './pages/Login';
import { Register } from './pages/Register';
import Navbar from './components/Navbar';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import MyApplications from './pages/MyApplications';

 const App = () => {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/myapplications" element={<MyApplications/>} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path='/jobs/:jobId' element={<JobDetails/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App