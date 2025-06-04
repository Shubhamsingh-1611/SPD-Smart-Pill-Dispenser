// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // If you're using React Router v6

// function PatientSchedulePage() {
//   const [schedule, setSchedule] = useState([]);
//   const navigate = useNavigate(); // If you're using React Router v6

//   useEffect(() => {
//     // Check if the user is logged in and fetch the schedule
//     const fetchSchedule = async () => {
//       try {
//         // Check for a token (basic authentication check)
//         const token = localStorage.getItem('token');
//         if (!token) {
//           navigate('/login'); // Redirect to login if not logged in
//           return;
//         }

//         // Fetch the schedule data
//         const response = await axios.get(
//           'http://localhost:3000/api/patients/schedule', // Replace with your actual backend URL
//           {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`, // Correct
//                 // Include JWT if using
//             },
//           }
//         );
//         setSchedule(response.data);
//       } catch (error) {
//         console.error('Error fetching schedule:', error);
//         // Handle error (e.g., display an error message)
//       }
//     };


//     fetchSchedule();
//   }, [navigate]); //  useEffect dependency array

//   return (
//     <div className="bg-blue-50 py-12">
//       <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
//         <div className="px-5 py-7">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-6">
//             My Medicine Schedule
//           </h2>

//           {/* Display the medicine schedule */}
//           {schedule.length > 0 ? (
//             <ul className="space-y-4">
//               {schedule.map((item) => (
//                 <li key={item._id} className="bg-gray-100 rounded-lg p-4">
//                   <div className="font-semibold">{item.medicineName}</div>
//                   <div>Dosage: {item.dosage}</div>
//                   <div>Time: {item.time}</div>
//                   <div>Date: {new Date(item.date).toLocaleDateString()}</div>
//                   {/* Display other schedule details */}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No medicine schedules found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PatientSchedulePage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // If you're using React Router v6

function PatientSchedulePage() {
  const [schedule, setSchedule] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); // Redirect to login if not logged in
          return;
        }

        const response = await axios.get(
          'http://localhost:3000/api/patients/schedule', // Replace with your actual backend URL
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setSchedule(response.data);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    fetchSchedule();
  }, [navigate]);

  const handleAddMedicineSchedule = () => {
    navigate('/addMedicineSchedule'); // Redirect to the addMedicineSchedule page
  };

  return (
    <div className="bg-blue-50 py-12">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="px-5 py-7">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            My Medicine Schedule
          </h2>

          {/* Display the medicine schedule */}
          {schedule.length > 0 ? (
            <ul className="space-y-4">
              {schedule.map((item) => (
                <li key={item._id} className="bg-gray-100 rounded-lg p-4">
                  <div className="font-semibold">{item.medicineName}</div>
                  <div>Dosage: {item.dosage}</div>
                  <div>Time: {item.time}</div>
                  <div>Date: {new Date(item.date).toLocaleDateString()}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No medicine schedules found.</p>
          )}

          {/* Add Medicine Schedule Button */}
          <div className="mt-6 text-right">
            <button
              onClick={handleAddMedicineSchedule}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Add Medicine Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientSchedulePage;