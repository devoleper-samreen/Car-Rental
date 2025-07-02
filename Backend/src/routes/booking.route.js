import express from 'express';

import { createBooking, getUserBookings } from '../controllers/booking.controller.js';
import { verifyUser } from '../middleware/verifyUser.js';

const router = express.Router();

router.use(verifyUser);

router.post('/', createBooking);
router.get('/', getUserBookings);

export default router;
