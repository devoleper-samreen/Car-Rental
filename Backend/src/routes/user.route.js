import express from 'express';
import { registerUser, loginUser, updatePassword, updateProfile } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/change-password', verifyToken, updatePassword);
router.put('/update-profile', verifyToken, updateProfile);

export default router;