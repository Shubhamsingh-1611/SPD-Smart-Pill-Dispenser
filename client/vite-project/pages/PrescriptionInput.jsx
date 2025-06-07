import axios from 'axios';
import { useState } from 'react';
import {toast} from 'react-toastify'

export default function PrescriptionInput() {
  const [text, setText] = useState('');
  const [schedule, setSchedule] = useState(null);

  const handleSubmit = async () => {
    // const user = req.user;
    const res = await axios.post('http://localhost:5000/parse-prescription', { text });
    // const res2 = await axios.post('http://localhost:3000/api/patients/schedule/', { schedule: res.data });
    const res2 = await axios.post('http://localhost:3000/api/patients/schedule', {
  // Replace with actual ID
  prescriptions: res.data // from AI model
},{
  withCredentials: true,
});
  if(res2) {
    toast.success('Schedule saved successfully!');
  }
    setSchedule(res.data);
    console.log(res.data);
  };

  return (
    <div className="p-4 mt-[80px]">
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Enter prescription here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
        Parse Prescription
      </button>

      {schedule && (
        <pre className="bg-gray-100 p-2 mt-4 rounded text-sm">{JSON.stringify(schedule, null, 2)}</pre>
      )}
    </div>
  );
}
