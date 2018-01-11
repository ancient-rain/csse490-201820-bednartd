const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors');
// const bcrypt = require('bcrypt');
require('dotenv').config();
const app = express();


const router = express.Router();
const methodOverride = require('method-override');

mongoose.Promise = global.Promise;

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(methodOverride((req) => {
    if (req.body && typeof req.body == 'object' && '_method' in req.body) {
        const method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

const port = process.env.PORT || 3000;
const dbURI = 'mongodb://localhost/amateur-projects-db';

require("./models/projects");
require("./models/users");

const projectRoute = require('./routes/projects');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');

mongoose.connect(dbURI, {
    useMongoClient: true
}, (err) => {
    if (err) {
        console.log(`ERROR connecting to ${dbURI}.${err}`);
    } else {
        console.log(`Successfully connected to ${dbURI}.`);
    }
});

require('./config/passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

app.use(logger('dev'));

app.use(passport.initialize());

// Log in a user
app.post('/login', loginRoute.login);

// Register a user
app.post('/register', registerRoute.register);

// Handle all /projects/* routes 
app.use('/projects', projectRoute);

app.listen(port, function () {
    console.log(`Listening on port number ${port}.`);
});


module.exports = app;