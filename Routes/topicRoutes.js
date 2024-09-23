import Router from 'express';

const router = Router();

import Topic from '../Model/Topic.js';


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

// Create a new topic
router.post('/api/topics', async (req, res) => {
    try {
        const newTopic = await Topic.create(req.body);
        res.status(201).json(newTopic);
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