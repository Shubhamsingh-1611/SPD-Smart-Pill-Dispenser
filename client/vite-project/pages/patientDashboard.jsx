import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function PatientDashboard({ patientId }) {
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

//useeffect to fetch patient data and medicine schedule
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/patients/schedule/get', {
          withCredentials: true,
        });
        console.log('Fetched patient data:', res.data);
        setPatient(res.data);
      } catch (err) {
        console.error('Error fetching patient:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, []);

  // logout function
  const handllogout = async() => {
    localStorage.removeItem("token");
    const res = await axios.post('http://localhost:3000/api/patients/logout', {}, {
  withCredentials: true // <--- this is important
});
    toast.success(res.data.message); // Show success message
    navigate('/login'); // Redirect to the login page after logout

  }
  //realtime notififation to take medicine

//this function will notify the user when it's time to take their medicine
  const notifyMedicine = (medicineName) => {
  toast.info(`⏰ Time to take your medicine: ${medicineName}`, {
    position: "top-right",
    autoClose: 8000,
    hideProgressBar: false,
  });
};

  useEffect(() => {
  const interval = setInterval(() => {
    const now = new Date();
    const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    patient.prescriptions.forEach((med) => {
      if (med.times.includes(currentTime)) {
        notifyMedicine(med.name);
      }
    });
  }, 60000); // Check every minute

  return () => clearInterval(interval);
}, []);

//chrome notification to take medicine
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  const triggerNotification = (medName) => {
  if (Notification.permission === "granted") {
    new Notification(`💊 Time to take your medicine: ${medName}`);
  }
};

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

      patient.prescriptions.forEach((med) => {
        if (med.times.includes(currentTime)) {
          triggerNotification(med.name);
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);
  
  // If loading or patient data is not available, show loading or error message
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!patient) return <p className="text-center mt-10 text-red-500">Patient not found</p>;

  return (
    <div className="max-w-4xl mx-auto  p-4 mt-[80px]">
      <h1 className="text-3xl font-bold text-blue-700 mb-4 inline">
        Welcome, {patient.patient.firstName} {patient.patient.lastName}
      </h1>
      <button onClick={handllogout} className="bg-red-500 mt-3 mr-4 absolute right-0 hover:red-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Log out</button>
      <p className="text-gray-600 mb-2">Email: {patient.patient.email}</p>
      <p className="text-gray-600 mb-4">Phone: {patient.patient.phone}</p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Medicine Schedule</h2>
      {patient.prescriptions.length === 0 ? (
        <p className="text-gray-500">No prescriptions available.</p>
      ) : (
        patient.prescriptions.map((schedule, index) => (
          <div key={index} className="bg-gray-200 p-4 shadow rounded-2xl mb-4">
            
              <div  className="mb-2">
                <p className="text-lg font-bold text-gray-700">{schedule.name}</p>
                <p className="text-sm text-gray-600">Dosage: {schedule.dosage}</p>
                <p className="text-sm text-gray-600">Frequency: {schedule.frequency}</p>
                <p className="text-sm text-gray-600">Times: {schedule.times.join(', ')}</p>
                <button  className="bg-blue-500 mt-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete</button>
              </div>
         
          
          </div>
        ))
      )}
    <button onClick={()=>navigate("/precription")} className="bg-red-500 mt-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">ADD Precpriction</button>
    </div>
  
  );
}
