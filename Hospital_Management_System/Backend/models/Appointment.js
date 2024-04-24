// models/Appointment.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const appointmentSchema = new Schema({
	patientName: { type: String, required: true },
	doctorName: { type: String, required: true },
	date: { type: Date, required: true },
	// Add more fields as needed
});

const Appointment =
	mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
