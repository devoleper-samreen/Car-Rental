import express from 'express';

import { createBooking } from '../controllers/booking.controller.js';
import { verifyUser } from '../middleware/verifyUser.js';

const router = express.Router();

router.use(verifyUser);

router.post('/', createBooking);
// router.get('/', getBookings);

export default router;
