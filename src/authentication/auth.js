const jwt = require("jsonwebtoken");

const Hospital = require("../models/hospital");

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");

        const decoded = jwt.verify( token, process.env.JWT_SECRET );

        const hospital = await Hospital.findById(decoded._id);

        if(!hospital) throw new Error("Token is missing or invalid!");

        req.hospital = hospital;
        next();
    } catch(e) {
        if( e.message === "Token is missing or invalid!" ) {
            return res.status(401).json({ message: e.message });
        }
        
        res.status(500).json({ message: e.message });
    }
};

module.exports = auth;