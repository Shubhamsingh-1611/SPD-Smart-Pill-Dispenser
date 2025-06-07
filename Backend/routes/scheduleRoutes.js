import expess from 'express';
import {
  getSchedule,
  addSchedule,
  updateSchedule,
  deleteSchedule,
} from '../controllers/scheduleController.js';
import protect from '../middleware/authMiddleware.js';
const router = expess.Router();

router.get('/get', protect, getSchedule);
router.post('/', protect, addSchedule); 
router.put('/:id', protect, updateSchedule);
router.delete('/:id', protect, deleteSchedule);

export default router;
// This file defines the routes for managing patient schedules.