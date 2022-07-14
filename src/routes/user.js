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

router.get( "/users/:id", auth, userHandlers.getUserById );

router.patch( "/users/:id", upload.single('profile'), auth, userHandlers.editUser );

router.delete( "/users/:id", auth, userHandlers.deleteUser );

router.get( "/all_users", auth, userHandlers.getAllUsers );

router.get( "/all_employees", auth, userHandlers.getAllEmployees );

router.get( "/get_users_by_role", auth, userHandlers.getUsersByRole );

router.get( "/get_patient_rate", auth, userHandlers.getPatientsByDate );

router.get( "/get_staff_rate", auth, userHandlers.getStaffsByDate );

router.get( "/search_users", auth, userHandlers.getUsersByNameAndRole );

router.get( "/search_staffs", auth, userHandlers.getStaffsByName );

router.get( "/doctor_by_email", auth, userHandlers.getDoctorByEmail );

router.get( "/patient_by_email", auth, userHandlers.getPatientByEmail );

module.exports = router;