import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import planRouter from './routes/planRoutes.js';

import { initDB } from './config/initDB.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001; 

// Middleware setup
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/plans', planRouter);


initDB().then(() => {
    console.log('Database initialized and server is ready to run');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});