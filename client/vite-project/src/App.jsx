import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import PatientRegistrationFrom from '../pages/PatientRegistrationForm.jsx';
import Login from '../pages/Login.jsx';
import HomePage from '../pages/HomePage.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx'
import PrescriptionInput from '../pages/PrescriptionInput.jsx';
import PatientDashboard from '../pages/patientDashboard.jsx';
import OCRPrescriptionInput from '../pages/OCRPrescriptionInput.jsx';

function App() {
  return (
    <Router>
        <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home page */}
        <Route path="/register" element={<PatientRegistrationFrom />} /> {/* Registration */}
        <Route path="/login" element={<Login />} /> {/* Patient dashboard */}
        <Route path="/ocr" element={<OCRPrescriptionInput />} /> {/* OCR Prescription Input */}
        <Route path="/patientD" element={<PatientDashboard/>} /> {/* Patient dashboard */}
        <Route path="/precription" element={<PrescriptionInput />} /> {/* Patient schedule page */}
      
      </Routes>
      <Footer/>

    </Router>
  );
}

export default App;