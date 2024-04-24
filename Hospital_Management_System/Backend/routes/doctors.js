const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Get all doctors
router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving doctors', error: err });
    }
});

// Add new doctor
router.post('/add', async (req, res) => {
    const { name, specialty } = req.body;
    const newDoctor = new Doctor({ name, specialty });

    try {
        const savedDoctor = await newDoctor.save();
        res.status(201).json(savedDoctor);
    } catch (err) {
        res.status(400).json({ message: 'Error adding new doctor', error: err });
    }
});

// Update doctor data
router.put('/update/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        doctor.name = req.body.name;
        doctor.specialty = req.body.specialty;

        await doctor.save();
        res.json({ message: 'Doctor updated!' });
    } catch (err) {
        res.status(400).json({ message: 'Error updating doctor', error: err });
    }
});

// Delete doctor by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json({ message: 'Doctor deleted!' });
    } catch (err) {
        res.status(400).json({ message: 'Error deleting doctor', error: err });
    }
});

module.exports = router;
