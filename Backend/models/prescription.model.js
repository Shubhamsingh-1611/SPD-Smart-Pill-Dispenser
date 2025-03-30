import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medications: [{
    medication: { type: mongoose.Schema.Types.ObjectId, ref: 'Medication', required: true },
    frequency: { type: String, required: true }, // e.g., "Once daily", "Twice daily"
    time: [{ type: String }], // Array of times for administration (e.g., ["08:00", "20:00"])
    dosage: { type: String } // Dosage for this specific medication in the prescription
  }],
  startDate: { type: Date },
  endDate: { type: Date },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

export default Prescription;