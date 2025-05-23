import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from "url";
import dotenv from 'dotenv';
import { connectDB } from './utils/db.js';
import userRoutes from './routes/user.route.js';
import adminRoutes from './routes/admin.route.js';
import carRoutes from './routes/car.route.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Define __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.get('/', (req, res) => {
    res.send('Server is running');
});
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/car', carRoutes);

// Connect to database
connectDB();

// Start server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
