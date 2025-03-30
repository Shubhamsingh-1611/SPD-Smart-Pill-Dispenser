import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  prescription: { type: mongoose.Schema.Types.ObjectId, ref: 'Prescription', required: true },
  medication: { type: mongoose.Schema.Types.ObjectId, ref: 'Medication', required: true },
  scheduledTime: { type: Date, required: true },
  status: {
    type: String,
    enum: ['pending', 'sent', 'acknowledged', 'missed', 'rescheduled'],
    default: 'pending'
  },
  //  Fields for re-reminders
  retryCount: { type: Number, default: 0 },
  nextReminderTime: { type: Date }, // Time for the next re-reminder
  maxRetries: { type: Number, default: 3 }, // Maximum number of re-reminders
  rescheduleInterval: { type: Number, default: 15 }, // Interval in minutes for re-reminders
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Reminder = mongoose.model('Reminder', reminderSchema);

export default Reminder;