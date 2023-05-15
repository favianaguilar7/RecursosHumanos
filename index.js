// Dependencies
const morgan = require('morgan');
const express = require('express');
// Routers
const app = express();
const user = require('./routes/user');
const logic = require('./routes/logic');

// Middleware
const auth = require('./middlewere/auth')
const notFound = require('./middlewere/notFound');
// const index = require('./middlewere/index');
const cors = require('./middlewere/cors');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/user", user);


app.use("/logic", logic);
app.use(notFound);
app.use(auth);

app.listen(process.env.PORT || 3000, () => {
    console.log("server is running...");
});
