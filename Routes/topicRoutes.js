import Router from 'express';

const router = Router();

import Topic from '../Model/Topic.js';


// Get all topics
router.get('/api/topics', async (req, res) => {
    try {
        const topics = await Topic.find();
        res.status(200).json(topics);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});




export default router;