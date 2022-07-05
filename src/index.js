const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// routers
const hospitalRouter = require("../src/routes/hospital");
const adminRouter = require("./routes/admin")
const userRouter = require('./routes/user');
const appointmentRouter = require("./routes/appointment");
const transacitionRouter = require('./routes/transaction');

const app = express();
const port = process.env.PORT;

mongoose.connect(process.env.MONGODB_URL);

app.use( express.json() );
app.use( bodyParser.json());
app.use( bodyParser.urlencoded({ extended: true }) );

app.use( cors() );

app.use( "/hospital", hospitalRouter );
app.use( adminRouter );
app.use( userRouter );
app.use( appointmentRouter );
app.use( transacitionRouter );

app.use( ( error, req, res, next ) => {
    const status = error.status || 500;
    res.status(status).json({ message: error.message });
});

app.listen(port, () => {
    console.log("Server is up on port ", port );
})