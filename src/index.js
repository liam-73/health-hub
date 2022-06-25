const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// routers
const hospitalRouter = require("../src/routes/hospital");
const doctorRouter = require("./routes/doctor");

const app = express();
const port = process.env.PORT;

mongoose.connect(process.env.MONGODB_URL);

app.use( express.json() );

app.use( cors() );

app.use( "/hospital", hospitalRouter );
app.use( doctorRouter );

app.use( ( error, req, res, next ) => {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
});

app.listen(port, () => {
    console.log("Server is up on port ", port );
})