const express = require("express");

const router = express.Router();

// handlers
const adminHandlers = require("../handlers/admin.handler");

// authenticaion
const auth =  require("../authentication/auth");

router.post( "/", auth, adminHandlers.addNewAdmin );

router.post( "/login", adminHandlers.login );

module.exports = router;