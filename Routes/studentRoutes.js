import Router from 'express';

const router = Router();

import Student from '../Model/Student.js';


// Get all students
router.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Get all students with email ending in gmail.com
router.get('/api/students/gmail', async (req, res) => {
    try {
        const students = await Student.find({ email: /@gmail\.com$/ });
        res.status(200).json(students);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Create a new student
router.post('/api/students', async (req, res) => {
    try {

        let { firstName, lastName, email } = req.body;

        const student = new Student({
            firstName,
            lastName,
            email
        });

        const savedStudent = await student.save();
        res.status(201).json(savedStudent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update a student
router.patch('/api/students/:id', async (req, res) => {
    try {
        const newValues = {...req.body};

        const updatedStudent = await Student.findOneAndUpdate(
            { _id: req.params.id },
            { $set: newValues },
            { new: true } // This option returns the updated document
        );
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a student
router.delete('/api/students/:id', async (req, res) => {
    try {
        const removedStudent = await Student.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json(removedStudent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});




export default router;