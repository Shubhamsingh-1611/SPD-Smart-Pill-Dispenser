import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs'; // Import bcrypt library
import Patient from '../models/patientModel.js';
import MedicineSchedule from '../models/MedicineSchedule.js'
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

const getSchedule = asyncHandler(async (req, res) => {
    const patientId = req.patient._id; // Assuming req.user is populated with the authenticated user's data
    try {
        const schedule = await MedicineSchedule.findOne({ patient: patientId }).populate('patient')
        if (!schedule) {
            res.status(404).json({ message: 'No schedule found for this patient' });
            return;
        }
        res.status(200).json(schedule);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching schedule', error: error.message });
    }
});

const addSchedule = asyncHandler(async (req, res) => {
    const patientId = req.patient._id; // Assuming req.user is populated with the authenticated user's data
    const { prescriptions } = req.body; // Extract prescriptions from request body
    if (!prescriptions || prescriptions.length === 0) {
        res.status(400).json({ message: 'No prescriptions provided' });
        return;
    }   
    
    const prescriptionArray = Object.entries(prescriptions).map(
  ([name, data]) => ({
    name,
    dosage: data.dosage,
    frequency: data.frequency,
    times: data.times,
  })
);
    try {
        const schedule = await MedicineSchedule.create({
            patient: patientId,
            prescriptions: prescriptionArray,
        });
        res.status(201).json(schedule);
    } catch (error) {
        res.status(500).json({ message: 'Error creating schedule', error: error.message });
    }

});
const updateSchedule = asyncHandler(async (req, res) => {});
const deleteSchedule = asyncHandler(async (req, res) => {});

export { getSchedule, addSchedule, updateSchedule, deleteSchedule };


