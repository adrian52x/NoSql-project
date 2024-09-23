import Router from 'express';

const router = Router();

import Activity from '../Model/Activity.js';


// Get all activities - with topicID
// router.get('/api/activities', async (req, res) => {
//     try {
//         const activities = await Activity.find();
//         res.status(200).json(activities);
//     } catch (error) {
//         res.status(404).json({ error: error.message });
//     }
// });

// Get all activities - with topic title
router.get('/api/activities', async (req, res) => {
    try {
        const activities = await Activity.find().populate('topicId', 'title');
        res.status(200).json(activities);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});



export default router;