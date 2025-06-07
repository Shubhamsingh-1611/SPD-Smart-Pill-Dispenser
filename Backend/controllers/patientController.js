import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs'; // Import bcrypt library
import Patient from '../models/patientModel.js';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

  


// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new patient
// @route   POST /api/patients/register
// @access  Public
const registerPatient = asyncHandler(async (req, res) => {
  // Validation
  console.log('Request body:', req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password, phone, address, dateOfBirth, medicalHistory } = req.body;

  // Check if the patient already exists
  const patientExists = await Patient.findOne({ email });

  if (patientExists) {
    res.status(400).json({message:"Email already registered"});
    throw new Error('Patient already exists');
  }

  // Hash the password using bcrypt
  const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
  const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt

  // Create the patient with the hashed password
  const patient = await Patient.create({
    firstName,
    lastName,
    email,
    password: hashedPassword, // Save the hashed password
    phone,
    address,
    dateOfBirth,
    medicalHistory,
  });

  if (patient) {
    res.status(201).json({
      _id: patient._id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      email: patient.email,
      phone: patient.phone,
      address: patient.address,
      dateOfBirth: patient.dateOfBirth,
      medicalHistory: patient.medicalHistory,
    });
    
  } else {
    res.status(400);
    throw new Error('Invalid patient data');
  }
});

// @desc    Authenticate a patient and set cookie
// @route   POST /api/patients/login

const loginPatient = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const patient = await Patient.findOne({ email });

  // Verify password using bcrypt
  if (patient && (await bcrypt.compare(password, patient.password))) {
    const token = generateToken(patient._id);
      

    res.cookie('jwt_token', token, {
  httpOnly: true,
  secure: false,
  sameSite: 'strict',
  path: '/',
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
});
// console.log(res.cookies.token);
    // Set JWT in an HTTP-only cookie
    // res.cookie('jwt', token,{
    //   httpOnly: true, // Prevents JavaScript access to the cookie
    //   secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    //   sameSite: 'Strict', // Helps prevent CSRF attacks
    //   maxAge: 30 * 24 * 60 * 60 * 1000, // Cookie expiration time (30 days)
    // });

    return res.json({
      _id: patient._id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      email: patient.email,
      phone: patient.phone,
      address: patient.address,
      dateOfBirth: patient.dateOfBirth,
      medicalHistory: patient.medicalHistory,
      token:token,
    });
  } else {
    return res.status(401).json({message:"Inavlid email or Password"});
    // throw new Error('Invalid email or password');
  }
});


const logoutPatient = asyncHandler(async (req, res) => {
 


//   res.clearCookie('jwt_token', {
//   httpOnly: true,
//   secure: false,
//   sameSite: 'strict',
//   path: '/',
// });
console.log("cleared cookie");
 console.log(req.cookies.jwt_token);

 res.clearCookie('jwt_token', {
  httpOnly: true,
  secure: false, // Set to true in production
  sameSite: 'strict',
 });

  

 return res.status(200).json({ message: 'Logged out successfully' });
  
});


export {
  registerPatient,
  loginPatient,
  logoutPatient, // Added logout functionality
};