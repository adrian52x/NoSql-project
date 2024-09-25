import Router from 'express';

const router = Router();

import Enrolment from '../Model/Enrolment.js';


// Get all enrolments
router.get('/api/enrolments', async (req, res) => {
    try {
        const enrolment = await Enrolment.find()
        .populate("studentId", "firstName")
        .populate("activityId", "topicId");
        res.status(200).json(enrolment);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});




//make a new enrolment
router.post('/api/enrolments', async (req, res) => {
    try {

        let { studentId, activityId } = req.body;

        const enrolment = new Enrolment({
            studentId,
            activityId,
        });

        const savedEnrolment = await enrolment.save();
        res.status(201).json(savedEnrolment);
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});





// Delete a student
router.delete('/api/enrolments/:id', async (req, res) => {
    try {
        const removedEnrolment = await Enrolment.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json(removedEnrolment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});





export default router;