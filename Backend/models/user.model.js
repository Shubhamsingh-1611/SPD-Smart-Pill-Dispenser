import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['patient', 'doctor', 'caregiver'],
    required: true
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  //  If the user is a patient, link to their doctor and caregivers
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User',  },
  caregivers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  //  If the user is a caregiver, link to their patients
  patients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  //  Common fields
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
},{
    timestamps:true
});

const User = mongoose.model('User', userSchema);

export default User;