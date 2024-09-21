import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import studentRouter from './Routes/studentRoutes.js';

// Create Express server
const app = express();
app.use(studentRouter);

dotenv.config();

const mongoURI = process.env.MONGO_URI;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Mongoose version:', mongoose.version);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.log('Failed to connect to MongoDB:', error);
    }
} 

// Initial connection attempt
connectToDatabase();


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});