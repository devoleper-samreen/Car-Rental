import express from 'express';
import { registerAdmin, loginAdmin, getAdminProfile, updatePassword, updatedProfile, getAllUsers, banUser, getAllBookings, changeBookingStatus } from "../controllers/admin.controller.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js"

const router = express.Router();

router.post('/register', registerAdmin)
router.post('/login', loginAdmin)
router.get('/profile', verifyAdmin, getAdminProfile)
router.put('/update-password', verifyAdmin, updatePassword)
router.put('/update-profile', verifyAdmin, updatedProfile)
router.get('/all-users', verifyAdmin, getAllUsers)
router.patch('/ban-user', verifyAdmin, banUser)
router.get('/all-bookings', verifyAdmin, getAllBookings)
router.put('/update-booking/:bookingId', verifyAdmin, changeBookingStatus)



export default router