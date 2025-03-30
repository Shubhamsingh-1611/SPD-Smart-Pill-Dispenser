// routes/userRoutes.js
import express from "express"
const router = express.Router();
import { body, validationResult } from "express-validator";

import  { getAllUsers, getUserById, updateUser, deleteUser,registerUser }
 from "../controllers/userController.js"

//  Get all users
router.get('/', getAllUsers);

//  Get a user by ID
router.get('/:id',getUserById);

//  Update a user by ID
router.put('/:id', updateUser);

//  Delete a user by ID
// router.delete('/:id', deleteUser);

//  Registration route
router.post(
  '/register',
  [
    body('role').isIn(['patient', 'doctor', 'caregiver']).withMessage('Invalid role'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('doctorLicense').if(body('role').equals('doctor')).notEmpty().withMessage('Doctor license is required'),
  ],
  registerUser //  Use the controller function
);

export default router;