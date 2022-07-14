const { badRequests, notFoundErrors } = require("../constants/error.constant");

const allErrorHandler = ( e, req, res, next ) => {
    const status = e.status || 500;

    if( badRequests.includes( e.message ) ) {
        return res.status(400).json({ message: e.message });
    }

    else if( notFoundErrors.includes( e.message ) ) {
        return res.status(404).json({ message: e.message });
    }

    else if ( e.message === "This email is already used!" ) {
        return res.status(409).json({ message: e.message });
    }

    res.status(status).json({ message: e.message });
};

module.exports = {
    allErrorHandler,
};