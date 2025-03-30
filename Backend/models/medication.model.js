import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema({
  name: String,
  dosage: String,
  // ... other medication details
});

const Medication = mongoose.model('Medication', medicationSchema);

export default Medication;