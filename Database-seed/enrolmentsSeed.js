import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Enrollment from '../Model/Enrolment.js'; // Adjust the path as necessary
import Student from '../Model/Student.js'; // Adjust the path as necessary
import Activity from '../Model/Activity.js'; // Adjust the path as necessary

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
};
connectToDatabase();

const getRandomDateFromLast7Days = () => {
    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - 7);
    return new Date(pastDate.getTime() + Math.random() * (today.getTime() - pastDate.getTime()));
};

const seedEnrollments = async (numEnrollments) => {
    try {
        // Clear existing enrollments
        await Enrollment.deleteMany({});

        // Fetch all students and activities
        const students = await Student.find({});
        const activities = await Activity.find({});

        if (students.length === 0 || activities.length === 0) {
            throw new Error('No students or activities found in the database.');
        }

        // Generate random enrollments
        const enrollments = [];
        for (let i = 0; i < numEnrollments; i++) {
            const randomStudent = students[Math.floor(Math.random() * students.length)];
            const randomActivity = activities[Math.floor(Math.random() * activities.length)];
            enrollments.push({
                studentId: randomStudent._id,
                activityId: randomActivity._id,
                dateEnrolled: getRandomDateFromLast7Days(),
            });
        }

        // Insert random enrollments into the database
        await Enrollment.insertMany(enrollments);
        console.log(`Inserted ${numEnrollments} enrollments into the database.`);
    } catch (error) {
        console.error('Error seeding enrollments:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Seed the database with 50 random enrollments
seedEnrollments(50);