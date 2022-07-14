const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

// routers
const hospitalRouter = require("../src/routes/hospital");
const adminRouter = require("./routes/admin")
const userRouter = require('./routes/user');
const appointmentRouter = require("./routes/appointment");
const transacitionRouter = require('./routes/transaction');

// error handler
const { serverErrorHandler } = require("./handlers/error.handler");

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

app.use( serverErrorHandler );

// sentry
Sentry.init({
    dsn: process.env.SENTRY,
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
        if (error.status === 400 || error.status === 500) {
          return true;
        }
        return false;
      },
}));

app.listen(port, () => {
    console.log("Server is up on port ", port );
})