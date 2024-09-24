import Router from 'express';

const router = Router();

import Topic from '../Model/Topic.js';
import Activity from '../Model/Activity.js';


// Get topics with specific keywords
router.get('/api/topics/search', async (req, res) => {
    const { keywords } = req.query; // e.g., keywords=document database
    try {
        const topics = await Topic.find({
            $text: { $search: keywords }
        });
        res.status(200).json(topics);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all topics
router.get('/api/topics', async (req, res) => {
    try {
        const topics = await Topic.find();
        res.status(200).json(topics);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Get a topic by ID
router.get('/api/topics/:id', async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.id);

        if (!topic) {
            res.status(404).json({ error: 'Topic not found' });
            return;
        }

        res.status(200).json(topic);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Get all activities in a topic
router.get('/api/topics/:id/activities', async (req, res) =>  {
    try {
        const {id} = req.params;

        // find the topic by id
        const topic = await Topic.findById(id);

        if (!topic) {
            return res.status(404).json({ error: 'Topic not found' });
        }

        // Find all activities related to the topic
        const activities = await Activity.find({ topicId: id }).select('-topicId -__v');;

        res.status(200).json({
            topic,       // The topic details
            activities,  // The activities related to the topic
        });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Create a new topic
router.post('/api/topics', async (req, res) => {
    try {

        const { topicTitle, description } = req.body;

        const topic = new Topic({
            topicTitle,
            description
        })

        const savedTopic = await topic.save();

        res.status(201).json(savedTopic);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a topic by ID
router.delete('/api/topics/:id', async (req, res) => {
    try {
        await Topic.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});




export default router;