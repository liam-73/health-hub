const express = require("express");
const multer = require('multer');

const router = new express.Router();

// handlers
const hospitalHandlers = require('../handlers/hospital');

// middlewares
const auth = require('../authentication/auth');

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

router.post( "/profile", upload.single('profile'), hospitalHandlers.createHospitalProfile );

router.post( "/login", hospitalHandlers.login );

router.get( "/profile", auth, hospitalHandlers.getProfile );

router.patch( "/profile", upload.single('profile'), auth, hospitalHandlers.editProfile );

router.delete( "/profile", auth, hospitalHandlers.deleteHospital );

module.exports = router;