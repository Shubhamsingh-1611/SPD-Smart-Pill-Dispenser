import mongoose from 'mongoose';

const MedicineScheduleSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  prescriptions: [
    {
      name: { type: String, required: true },
      dosage: { type: String, required: true },
      frequency: { type: String, required: true },
      times: [{ type: String, required: true }],
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MedicineSchedule = mongoose.model('MedicineSchedule', MedicineScheduleSchema);

export default MedicineSchedule;
