import React, { useState } from 'react';
import axios from 'axios';

function AddMedicineScheduleForm({ onScheduleAdded }) {
  const [newSchedule, setNewSchedule] = useState({
    medicineName: '',
    dosage: '',
    time: '',
    date: '',
    frequency: '',
    instructions: '',
    notes: '',
  });

  const handleAddSchedule = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/patients/schedule', // Replace with your backend URL
        newSchedule,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('Schedule added:', response.data);
      if (onScheduleAdded) {
        onScheduleAdded();
      }
      // Clear the form
      setNewSchedule({
        medicineName: '',
        dosage: '',
        time: '',
        date: '',
        frequency: '',
        instructions: '',
        notes: '',
      });
    } catch (error) {
      console.error('Error adding schedule:', error);
    }
  };

  return (
    <form onSubmit={handleAddSchedule} className="space-y-6 bg-white shadow-md rounded px-8 pt-6 pb-8 md:w-[600px] md:ml-[300px] mt-[60px]">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Medicine Schedule</h3>

      {/* Medicine Name */}
      <div className="mb-4">
        <label
          htmlFor="medicineName"
          className="block text-gray-700 text-sm font-medium mb-2"
        >
          Medicine Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="medicineName"
          value={newSchedule.medicineName}
          onChange={(e) =>
            setNewSchedule({ ...newSchedule, medicineName: e.target.value })
          }
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Dosage */}
      <div className="mb-4">
        <label
          htmlFor="dosage"
          className="block text-gray-700 text-sm font-medium mb-2"
        >
          Dosage <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="dosage"
          value={newSchedule.dosage}
          onChange={(e) =>
            setNewSchedule({ ...newSchedule, dosage: e.target.value })
          }
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Time */}
      <div className="mb-4">
        <label
          htmlFor="time"
          className="block text-gray-700 text-sm font-medium mb-2"
        >
          Time <span className="text-red-500">*</span>
        </label>
        <input
          type="time"
          id="time"
          value={newSchedule.time}
          onChange={(e) =>
            setNewSchedule({ ...newSchedule, time: e.target.value })
          }
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Date */}
      <div className="mb-4">
        <label
          htmlFor="date"
          className="block text-gray-700 text-sm font-medium mb-2"
        >
          Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="date"
          value={newSchedule.date}
          onChange={(e) =>
            setNewSchedule({ ...newSchedule, date: e.target.value })
          }
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Frequency */}
      <div className="mb-4">
        <label
          htmlFor="frequency"
          className="block text-gray-700 text-sm font-medium mb-2"
        >
          Frequency
        </label>
        <input
          type="text"
          id="frequency"
          value={newSchedule.frequency}
          onChange={(e) =>
            setNewSchedule({ ...newSchedule, frequency: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Instructions */}
      <div className="mb-4">
        <label
          htmlFor="instructions"
          className="block text-gray-700 text-sm font-medium mb-2"
        >
          Instructions
        </label>
        <textarea
          id="instructions"
          value={newSchedule.instructions}
          onChange={(e) =>
            setNewSchedule({ ...newSchedule, instructions: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>

      {/* Notes */}
      <div className="mb-4">
        <label
          htmlFor="notes"
          className="block text-gray-700 text-sm font-medium mb-2"
        >
          Notes
        </label>
        <textarea
          id="notes"
          value={newSchedule.notes}
          onChange={(e) =>
            setNewSchedule({ ...newSchedule, notes: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        >
          Add Schedule
        </button>
      </div>
    </form>
  );
}

export default AddMedicineScheduleForm;