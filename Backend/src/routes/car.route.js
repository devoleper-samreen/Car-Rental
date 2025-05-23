import express from 'express';
import { addCar, getCarById, getCarImage, searchCars, getAllCarsByAdmin, getAllCars } from '../controllers/car.controller.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';
import { upload } from '../utils/multer.js';

const router = express.Router();

router.post('/add', verifyAdmin, upload.single('image'), addCar);
router.get('/car/:id', getCarById);
router.get('/image/:id', getCarImage);
router.get('/search', searchCars);
router.get('/all', verifyAdmin, getAllCarsByAdmin);
router.get('/all-cars', getAllCars);


export default router;

