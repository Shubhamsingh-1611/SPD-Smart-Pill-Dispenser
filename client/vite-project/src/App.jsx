import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from '../pages/RegistrationFrom.jsx';
import PatientDashboard from '../pages/PatientDashboard.jsx';
import DoctorDashboard from '../pages/DoctorDashboard.jsx';
import CaregiverDashboard from '../pages/CaregiverDashboard.jsx';
import HomePage from '../pages/HomePage.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx'

function App() {
  return (
    <Router>
        <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home page */}
        <Route path="/register" element={<RegistrationForm />} /> {/* Registration */}
        <Route path="/patient-dashboard" element={<PatientDashboard />} /> {/* Patient dashboard */}
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} /> {/* Doctor dashboard */}
        <Route path="/caregiver-dashboard" element={<CaregiverDashboard />} /> {/* Caregiver dashboard */}
        {/* Add more routes as needed */}
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;