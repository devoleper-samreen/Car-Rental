import express from 'express';
import { registerUser, loginUser, changePassword } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/change-password', verifyToken, changePassword);

export default router;