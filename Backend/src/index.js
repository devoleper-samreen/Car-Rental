import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './utils/db.js';
import userRoutes from './routes/user.route.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send('Server is running');
});
app.use('/api/users', userRoutes);

// Connect to database
connectDB();

// Start server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
