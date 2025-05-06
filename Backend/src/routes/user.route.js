import express from 'express';
import { registerUser, loginUser, updatePassword, updateProfile } from '../controllers/user.controller.js';
import { verifyUser } from '../middleware/verifyUser.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/change-password', verifyUser, updatePassword);
router.put('/update-profile', verifyUser, updateProfile);

export default router;