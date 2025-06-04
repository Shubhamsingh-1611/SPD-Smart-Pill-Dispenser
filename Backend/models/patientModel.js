import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema({
  // Core Information
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Contact Information
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  // Additional Patient Details
  dateOfBirth: {
    type: Date,
  },
  medicalHistory: {
    type: String,
  },
  // Relationships with other models
  caregiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Caregiver', // Assuming you have a Caregiver model
  },
  medicineSchedules: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MedicineSchedule', // Assuming you have a MedicineSchedule model
  }],
  // ... any other relevant patient-specific information
}, {
  timestamps: true,
});

const Patient = mongoose.model('Patient', PatientSchema);

export default Patient;