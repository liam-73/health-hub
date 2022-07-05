const express = require("express");
const multer = require("multer");

const router = new express.Router();

// authentication
const auth = require("../authentication/auth");

// handlers
const userHandlers = require("../handlers/user");

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

router.post( "/add_user", upload.single('profile'), auth, userHandlers.addUser );

router.get( "/users", auth, userHandlers.getUserById );

router.patch( "/edit_user", upload.single('profile'), auth, userHandlers.editUser );

router.delete( "/users", auth, userHandlers.deleteUser );

router.get( "/all_users", auth, userHandlers.getAllUsers );

router.get( "/all_doctors", auth, userHandlers.getAllDoctors );

router.get( "/all_patients", auth, userHandlers.getAllPatients );

router.get( "/all_staffs", auth, userHandlers.getAllStaffs );

router.get( "/get_patient_rate", auth, userHandlers.getPatientsByDate );

module.exports = router;