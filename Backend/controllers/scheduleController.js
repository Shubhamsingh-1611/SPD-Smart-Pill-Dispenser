import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs'; // Import bcrypt library
import Patient from '../models/patientModel.js';
import MedicineSchedule from '../models/MedicineSchedule.js'
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

const getSchedule = asyncHandler(async (req, res) => {});

const addSchedule = asyncHandler(async (req, res) => {});
const updateSchedule = asyncHandler(async (req, res) => {});
const deleteSchedule = asyncHandler(async (req, res) => {});

export { getSchedule, addSchedule, updateSchedule, deleteSchedule };


