import express from 'express';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

import studentRouter from './Routes/studentRoutes.js';
import activityRouter from './Routes/activityRoutes.js';
import topicRouter from './Routes/topicRoutes.js';
import enrolmentRouter from './Routes/enrolmentRoutes.js';

// Create Express server
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Your routes here
app.use(studentRouter);
app.use(activityRouter);
app.use(topicRouter);
app.use(enrolmentRouter);



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