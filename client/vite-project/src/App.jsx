import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import PatientRegistrationFrom from '../pages/PatientRegistrationForm.jsx';
import Login from '../pages/Login.jsx';
import HomePage from '../pages/HomePage.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx'
import PatientSchedulePage from '../pages/PatientSchedulePage.jsx';
import AddMedicineScheduleForm from '../pages/AddMedicineScheduleForm.jsx';
import UserDashboard from '../pages/UserDashboard.jsx';
import PrescriptionInput from '../pages/PrescriptionInput.jsx';
import PatientDashboard from '../pages/patientDashboard.jsx';

function App() {
  return (
    <Router>
        <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home page */}
        <Route path="/register" element={<PatientRegistrationFrom />} /> {/* Registration */}
        <Route path="/login" element={<Login />} /> {/* Patient dashboard */}
        <Route path="/schedule" element={<PatientSchedulePage />} />
        <Route path="/patientD" element={<PatientDashboard/>} /> {/* Patient dashboard */}
        <Route path="/precription" element={<PrescriptionInput />} /> {/* Patient schedule page */}
        <Route path="/userDashboard" element={<UserDashboard />} /> {/* User dashboard */}
        <Route path="/addMedicineSchedule" element={<AddMedicineScheduleForm />} /> {/* Add medicine schedule */}
        {/* Add more routes as needed */}
      </Routes>
      <Footer/>

    </Router>
  );
}

export default App;