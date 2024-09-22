import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import Student from '../Model/Student.js'; // Adjust the path as necessary

// Load environment variables
dotenv.config({ path: '../.env' });

const mongoURI = process.env.MONGO_URI;


// Connect to MongoDB
const connectToDatabase = async () => {
    try {        
        await mongoose.connect(mongoURI);
        console.log('Mongoose version:', mongoose.version);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.log('Failed to connect to MongoDB:', error);
    }
} 
connectToDatabase();

const seedStudents = async (numStudents) => {
    try {
        // Clear existing students
        await Student.deleteMany({});

        // Generate random students
        const students = [];
        for (let i = 0; i < numStudents; i++) {
            students.push({
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
            });
        }

        // Insert random students into the database
        await Student.insertMany(students);
        console.log(`Inserted ${numStudents} students into the database.`);
    } catch (error) {
        console.error('Error seeding students:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Seed the database with 50 random students
seedStudents(50);