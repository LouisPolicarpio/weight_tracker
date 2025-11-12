import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import logRoutes from './routes/logRoutes.js';
import dietPlanRoutes from  './routes/dietPlanRoutes.js'
import { initDB } from './config/initDB.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001; 

// Middleware setup
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));


const allowedOrigins = [
  "http://localhost:5173",                // local dev
];


app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));

// Routes
app.use('/api/log', logRoutes);
app.use('/api/dietPlan', dietPlanRoutes);


initDB().then(() => {
    console.log('Database initialized and server is ready to run');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});