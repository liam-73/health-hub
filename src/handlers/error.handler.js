const serverErrorHandler = ( e, req, res, next ) => {
    const status = e.status || 500;

    if(
        e.message === "Invalid Input" ||
        e.message === "Invalid Email!" ||
        e.message === "Wrong Password!" ||
        e.message === "You must provide user id!" ||
        e.message === "you must provide doctor id!" ||
        e.message === "You must provide appointment id!" ||
        e.message === "Out of tokens, try again later!" ||
        e.message === "You must provide start date and end date!" ||
        e.message === "you must provide a name and role!" ||
        e.message === "you must provide role!" ||
        e.message === "You must only provide 7 days!"
    ) {
        return res.status(400).json({ message: e.message });
    }

    else if(
        e.message === "There's no admin with this user id!" ||
        e.message === "Doctor not found!" ||
        e.message === "Patient not found!" ||
        e.message === "Appointment not found!"
    ) {
        return res.status(404).json({ message: e.message });
    }

    else if ( e.message === "This email is already used!" ) {
        return res.status(409).json({ message: e.message });
    }

    res.status(status).json({ message: e.message });
};

module.exports = {
    serverErrorHandler,
};