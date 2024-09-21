import Router from 'express';

const router = Router();

import Student from '../Model/Student.js';



router.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.json({ message: error });
    }
});



export default router;