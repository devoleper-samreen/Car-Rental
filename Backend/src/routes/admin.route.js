import express from 'express';
import { registerAdmin, loginAdmin, getAdminProfile, updatePassword, updatedProfile, getAllUsers } from "../controllers/admin.controller.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js"

const router = express.Router();

router.post('/register', registerAdmin)
router.post('/login', loginAdmin)
router.get('/profile', verifyAdmin, getAdminProfile)
router.put('/update-password', verifyAdmin, updatePassword)
router.put('/update-profile', verifyAdmin, updatedProfile)
router.get('/all-users', verifyAdmin, getAllUsers)


export default router