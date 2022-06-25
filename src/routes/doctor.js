const express = require("express");
const multer = require("multer");

const router = new express.Router();

// authentication
const auth = require("../authentication/auth");

// handlers
const doctorHandlers = require("../handlers/doctor");

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

router.post( "/add_doctor", upload.single('profile'), auth, doctorHandlers.addDoctor );

router.get( "/doctors", auth, doctorHandlers.getDoctor );

router.patch( "/edit_doctor", upload.single('profile'), auth, doctorHandlers.editDoctor );

router.delete( "/doctors", auth, doctorHandlers.deleteDoctor );

router.get( "/all_doctors", auth, doctorHandlers.getAllDoctors );

module.exports = router;