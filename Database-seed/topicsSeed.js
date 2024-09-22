import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../Model/Topic.js';

// Load environment variables from .env file
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

const seedTopics = async () => {
    try {
        // Clear existing topics
        await Topic.deleteMany({});

        // Predefined topics
        const topics = [
            { title: 'What is a document database?', description: 'An overview of document databases.' },
            { title: 'What is database normalization?', description: 'An explanation of database normalization.' },
            { title: 'What is an entity relationship diagram?', description: 'An introduction to entity relationship diagrams.' },
            { title: 'What is a document database method to Create/Read/Update/Delete data?', description: 'Methods to perform CRUD operations in document databases.' },
            { title: 'How does a database connect to a Web Front End?', description: 'Explanation of how databases connect to web front ends.' },
            { title: 'What is a relational database?', description: 'An overview of relational databases.' },
            { title: 'What is a NoSQL database?', description: 'An introduction to NoSQL databases.' },
            { title: 'What is database indexing?', description: 'An explanation of database indexing.' },
            { title: 'What is a database transaction?', description: 'An overview of database transactions.' },
            { title: 'What is database sharding?', description: 'An introduction to database sharding.' },
        ];

        // Insert predefined topics into the database
        await Topic.insertMany(topics);
        console.log('Inserted 10 topics into the database.');
    } catch (error) {
        console.error('Error seeding topics:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Seed the database with predefined topics
seedTopics();