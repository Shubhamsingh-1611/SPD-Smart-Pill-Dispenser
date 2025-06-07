import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UserDashboard() {
  const navigate = useNavigate();

  const handleClick = async() => {
    localStorage.removeItem("token");
    const res = await axios.post('http://localhost:3000/api/patients/logout', {}, {
  withCredentials: true // <--- this is important
});

    // console.log(res);to
    toast.success(res.data.message); // Show success message
    navigate('/login'); // Redirect to the login page after logout

  }
  const user = {
    name: "John Doe",
    prescriptions: [
      {
        name: "Paracetamol",
        dosage: "500mg",
        times: ["08:00 AM", "08:00 PM"],
      },
      {
        name: "Metformin",
        dosage: "1000mg",
        times: ["08:00 AM"],
      },
      {
        name: "Aspirin",
        dosage: "75mg",
        times: ["08:00 AM"],
      },
    ],
  };

  return (
    <div className="min-h-screen mt-[80px] bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Welcome, {user.name}
        </h1>
        <button onClick={handleClick} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
          logout
        </button>

        <div className="grid gap-6">
          {user.prescriptions.map((med, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {med.name} ({med.dosage})
              </h2>
              <p className="text-gray-600 mt-2">Scheduled Times:</p>
              <ul className="list-disc list-inside text-gray-700">
                {med.times.map((time, i) => (
                  <li key={i}>{time}</li>
                ))}
              </ul>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
                Mark as Taken
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
