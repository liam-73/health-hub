const express = require("express");
const multer = require("multer");
const upload = multer();

const router = new express.Router();

// authentication
const auth = require("../authentication/auth");

// handlers
const appointmentHandlers = require("../handlers/appointment.handler");

router.use(auth);

router.post('/', upload.any(), appointmentHandlers.createAppointment );

router.get( '/', appointmentHandlers.getAppointments );

router.get( '/:id', appointmentHandlers.getAppointmentById );

router.patch( '/:id', upload.any(), appointmentHandlers.editAppointment );

router.delete( '/:id', appointmentHandlers.deleteAppointment );


module.exports = router; 