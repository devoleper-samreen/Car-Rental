import express from 'express';
import { registerAdmin, loginAdmin, getAdminProfile, updatePassword, updatedProfile } from "../controllers/admin.controller.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js"

const router = express.Router();

router.post('/register', registerAdmin)
router.post('/login', loginAdmin)
router.get('/profile', verifyAdmin, getAdminProfile)
router.put('/update-password', verifyAdmin, updatePassword)
router.put('/update-profile', verifyAdmin, updatedProfile)


export default router