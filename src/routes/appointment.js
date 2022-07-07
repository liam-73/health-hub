const express = require("express");
const multer = require("multer");
const upload = multer();

const router = new express.Router();

// authentication
const auth = require("../authentication/auth");

// handlers
const appointmentHandlers = require("../handlers/appointment");

router.post('/make_appointment', upload.any(), auth, appointmentHandlers.makeAppointment );

router.get( '/appointments/:id', auth, appointmentHandlers.getAppointmentsByDoctorId );

router.get( '/appointments_by_date', auth, appointmentHandlers.getAppointmentsByDate );

router.patch( '/appointments/:id', upload.any(), auth, appointmentHandlers.editAppointment );

router.delete( '/appointments/:id', auth, appointmentHandlers.deleteAppointment );

router.get( '/all_appointments', auth, appointmentHandlers.getAllAppointments );

module.exports = router; 