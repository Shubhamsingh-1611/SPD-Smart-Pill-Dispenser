// import express from 'express';
// const router = express.Router();

// router.get('/', (req, res) => {
//     res.send('Patient route is working');
// });

// export default router;

import express from 'express';
import {
  registerPatient,
  loginPatient,
  getPatientProfile,
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
router.get('/profile', protect, getPatientProfile);
// router.get('/:id/schedule',protect,getMedicineSchedule)

export default router;
