import express from 'express';

import {
  registerPatient,
  loginPatient,
  logoutPatient,

} from '../controllers/patientController.js';
import protect from '../middleware/authMiddleware.js';
import { body } from 'express-validator';

const router = express.Router();

router.post(
  '/register',
  [
    body('firstName', 'First name is required').notEmpty(),
    body('lastName', 'Last name is required').notEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password is required').notEmpty(),
  ],
  registerPatient
);
router.post('/login', loginPatient);
router.post('/logout',protect,logoutPatient);
// router.get('/profile', protect, getPatientProfile);
// router.get('/:id/schedule',protect,getMedicineSchedule)

export default router;
