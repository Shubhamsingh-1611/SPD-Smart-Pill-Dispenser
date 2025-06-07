import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PatientDashboard({ patientId }) {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/patients/schedule/get');
        setPatient(res.data);
      } catch (err) {
        console.error('Error fetching patient:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [patientId]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!patient) return <p className="text-center mt-10 text-red-500">Patient not found</p>;

  return (
    <div className="max-w-4xl mx-auto  p-4 mt-[80px]">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        Welcome, {patient.firstName} {patient.lastName}
      </h1>
      <p className="text-gray-600 mb-2">Email: {patient.email}</p>
      <p className="text-gray-600 mb-4">Phone: {patient.phone}</p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Medicine Schedule</h2>
      {patient.medicineSchedules.length === 0 ? (
        <p className="text-gray-500">No prescriptions available.</p>
      ) : (
        patient.medicineSchedules.map((schedule, index) => (
          <div key={index} className="bg-white p-4 shadow rounded-2xl mb-4">
            {schedule.prescriptions.map((med, i) => (
              <div key={i} className="mb-2">
                <p className="text-lg font-bold text-gray-700">{med.name}</p>
                <p className="text-sm text-gray-600">Dosage: {med.dosage}</p>
                <p className="text-sm text-gray-600">Frequency: {med.frequency}</p>
                <p className="text-sm text-gray-600">Times: {med.times.join(', ')}</p>
              </div>
            ))}
            <p className="text-sm text-gray-400 mt-2">Added: {new Date(schedule.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}
