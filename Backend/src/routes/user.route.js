import express from 'express';
import { registerUser, loginUser, updatePassword } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/change-password', verifyToken, updatePassword);

export default router;