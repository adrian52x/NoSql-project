import Router from 'express';

const router = Router();

import Activity from '../Model/Activity.js';


// Get all activities
router.get('/api/activities', async (req, res) => {
    try {
        const activities = await Activity.find().populate('topicId', 'topicTitle');
        res.status(200).json(activities);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Get an activity by ID
router.get('/api/activities/:id', async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id).populate('topicId', 'topicTitle');

        if (!activity) { 
            res.status(404).json({ error: 'Activity not found' });
            return;
        }

        res.status(200).json(activity);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Create a new activity
router.post('/api/activities', async (req, res) => {
    try {

        const { activityTitle, description, topicId } = req.body;

        const activity = new Activity({
            activityTitle,
            description,
            topicId
        })


        const savedActivity = await activity.save()

        res.status(201).json(savedActivity);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete an activity by ID
router.delete('/api/activities/:id', async (req, res) => {
    try {
        await Activity.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});



export default router;