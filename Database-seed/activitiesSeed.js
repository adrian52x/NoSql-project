import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Activity from '../Model/Activity.js'; // Adjust the path as necessary
import Topic from '../Model/Topic.js'; // Adjust the path as necessary

// Load environment variables from .env file
dotenv.config({ path: '../.env' }); // Adjust the path as necessary

const mongoURI = process.env.MONGO_URI;

// Predefined topics and activities
const topicsWithActivities = [
    {
        topic: 'What is a document database?',
        activities: [
            'Introduction to Document Databases',
            'Advantages and Disadvantages of Document Databases',
            'Real-world Use Cases of Document Databases'
        ]
    },
    {
        topic: 'What is database normalization?',
        activities: [
            'Introduction to Database Normalization',
            'Normal Forms Explained',
            'Benefits of Database Normalization'
        ]
    },
    {
        topic: 'What is an entity relationship diagram?',
        activities: [
            'Introduction to Entity Relationship Diagrams',
            'Components of an Entity Relationship Diagram',
            'Creating an Entity Relationship Diagram'
        ]
    },
    {
        topic: 'What is a document database method to Create/Read/Update/Delete data?',
        activities: [
            'Introduction to CRUD Operations in Document Databases',
            'Implementing CRUD Operations',
            'Best Practices for CRUD Operations'
        ]
    },
    {
        topic: 'How does a database connect to a Web Front End?',
        activities: [
            'Introduction to Database Connectivity',
            'Connecting a Database to a Web Front End',
            'Best Practices for Database Connectivity'
        ]
    },
    {
        topic: 'What is a relational database?',
        activities: [
            'Introduction to Relational Databases',
            'Key Concepts of Relational Databases',
            'Real-world Use Cases of Relational Databases'
        ]
    },
    {
        topic: 'What is a NoSQL database?',
        activities: [
            'Introduction to NoSQL Databases',
            'Types of NoSQL Databases',
            'Real-world Use Cases of NoSQL Databases'
        ]
    },
    {
        topic: 'What is database indexing?',
        activities: [
            'Introduction to Database Indexing',
            'Types of Database Indexes',
            'Best Practices for Database Indexing'
        ]
    },
    {
        topic: 'What is a database transaction?',
        activities: [
            'Introduction to Database Transactions',
            'ACID Properties of Transactions',
            'Implementing Transactions in Databases'
        ]
    },
    {
        topic: 'What is database sharding?',
        activities: [
            'Introduction to Database Sharding',
            'Benefits and Challenges of Sharding',
            'Implementing Sharding in Databases'
        ]
    }
];

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

const seedDatabase = async () => {
    try {
        // Clear existing activities
        await Activity.deleteMany({});

        // Create activities for each topic
        for (const topicWithActivities of topicsWithActivities) {
            const existingTopic = await Topic.findOne({ topicTitle: topicWithActivities.topic });
            if (!existingTopic) {
                console.log('Topics need to be seeded first.');
                return;
            }

            // Create activities for the topic
            const activities = topicWithActivities.activities.map(title => ({
                activityTitle: title,
                description: `Description for "${title}"`,
                topicId: existingTopic._id
            }));

            // Insert activities into the database
            await Activity.insertMany(activities);
        }

        console.log('Inserted activities into the database.');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Seed the database with predefined topics and activities
seedDatabase();