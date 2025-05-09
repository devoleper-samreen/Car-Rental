import express from 'express';
import { addCar, getCarById, getCarImage, searchCars } from '../controllers/car.controller.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';
import { upload } from '../utils/multer.js';

const router = express.Router();

router.post('/add', verifyAdmin, upload.single('image'), addCar);
router.get('/:id', getCarById);
router.get('/image/:id', getCarImage);
router.get('/search', searchCars);

export default router;

