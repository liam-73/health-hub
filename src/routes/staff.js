const express = require("express");
const multer = require("multer");

const router = new express.Router();

// authentication
const auth = require("../authentication/auth");

// handlers
const staffHandlers = require("../handlers/staff");

const storage = multer.memoryStorage();

const fileFilter = ( req, file, cb ) => {
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

router.post( "/add_staff", upload.single('profile'), auth, staffHandlers.addStaff );

router.get( "/staffs", auth, staffHandlers.getStaffById );

router.patch( "/staffs", upload.single('profile'), auth, staffHandlers.editStaff );

router.delete( "/staffs", auth, staffHandlers.deleteStaff );

router.get( "/all_staffs", auth, staffHandlers.getAllStaffs );

module.exports = router;