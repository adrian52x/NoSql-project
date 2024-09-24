import Router from 'express';

const router = Router();

import Enrolment from '../Model/Enrolment.js';
import Student from '../Model/Student.js';

// Get all enrolments
router.get('/api/enrolments', async (req, res) => {
    try {
        const enrolments = await Enrolment.find();
        res.status(200).json(enrolments);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// // Get all enrolments for a student
// router.get('/api/enrolments/student/:studentId', async (req, res) => {
//     try {
//         const enrolments = await Enrolment.find({ studentId: req.params.studentId });
//         res.status(200).json(enrolments);
//     } catch (error) {
//         res.status(404).json({ error: error.message });
//     }
// });

// Get all enrolments for a student
router.get('/api/enrolments/student/:studentId', async (req, res) => {
    try {
        const student = await Student.findById(req.params.studentId);

        const enrolments = await Enrolment.find({ studentId: req.params.studentId })
            .populate({
                path: 'activityId',
                populate: {
                    path: 'topicId',
                    model: 'Topic'
                }
            });

        
        if (enrolments.length === 0) {
            return res.status(404).json({ error: 'No enrolments found for this student' });
        }

        const formattedResponse = {
            _id: enrolments[0]._id,
            studentFullName: `${student.firstName} ${student.lastName}`,
            activities: enrolments.map(enrolment => enrolment.activityId) // activityId is an object (as it's populated)
        };

        res.status(200).json({ enrolments: formattedResponse });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Create a new enrolment
router.post('/api/enrolments', async (req, res) => {
    try {
        
        const { studentId, activityId } = req.body;

        const enrolment = new Enrolment({
            studentId,
            activityId
        });

        const savedEnrolment = await enrolment.save();

        res.status(201).json(savedEnrolment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete an enrolment by ID
router.delete('/api/enrolments/:id', async (req, res) => {
    try {
        await Enrolment.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});


export default router;