const express = require("express");
const multer = require("multer");

const router = new express.Router();

// authentication
const auth = require("../authentication/auth");

// handlers
const patientHandlers = require("../handlers/patient");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb ) => {
    if( file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/img"
    ) {
        cb(null, true);
    }
    cb(null, false);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 1024 * 1024 * 10 } });

router.post( "/add_patient", upload.single('profile'), auth, patientHandlers.addPatient );

router.get( "/patients", auth, patientHandlers.getPatientById );

router.patch( "/edit_patient", upload.single('profile'), auth, patientHandlers.editPatient );

router.delete( "/patients", auth, patientHandlers.deletePatient );

router.get( "/all_patients", auth, patientHandlers.getAllPatients );

module.exports = router;