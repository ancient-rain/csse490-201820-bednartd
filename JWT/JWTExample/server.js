// =======================
// get the packages we need
// =======================
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const jwt = require('jsonwebtoken'); // used to create, sign, 
//  and verify tokens
const config = require('./config'); // get our config file
const User = require('./models/user'); // get our mongoose model

// =======================
// configuration =========
// =======================
const port = process.env.PORT || 8080;
mongoose.connect(config.database, {
    useMongoClient: true
}); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// routes ================
// =======================
// basic route
app.get('/', (req, res) => {
    res.send(`Hello! The API is at http://localhost:${port}/api`);
});

// TODO: 1 Create a simple user using the model in models/user.js
// (GET http://localhost:8080/setup)
app.get('/setup', (req, res) => {

    // create a sample user
    const user = new User({
        name: "Trevor Bednarek",
        // password: "swordfish",
        admin: true
    });

    user.setPassword('swordfish');

    user.save(err => {
        if (err) {
            res.json(err);
        } else {
            console.log('User saved successfully!');
            res.json({
                success: true
            });
        }
    });
});

// API ROUTES -------------------
// we'll get to these in a second

// DONE: 2 work on the apiRoutes 
const apiRoutes = express.Router();

// get an instance of the router for api routes

// DONE: 4 route to authenticate a user 
// (POST http://localhost:8080/api/login)
// Test in Postman
apiRoutes.post('/login', (req, res) => {
    User.findOne({
        name: req.body.name
    }, (err, user) => {
        if (err) {
            res.status(400);
            res.json(err);
        } else if (!user) {
            res.status(404);
            res.json({
                success: false,
                message: 'Authentication failed, no user.'
            });
        } else if (user) {
            if (user.validPassword(req.body.password)) {
                res.status(403);
                res.json({
                    success: false,
                    message: 'Authentication failed, wrong password.'
                });
            } else {
                const payload = {
                    name: user.name,
                    admin: user.admin
                };
                const token = jwt.sign(payload, app.get('superSecret'), {
                    expiresIn: "24h"
                });
                res.json({
                    success: true,
                    message: 'Authentication successful!',
                    token: token
                });
            }
        }
    });
});

// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the coolest API on earth!'
    });
});

// TODO: 5 route middleware to verify a token
// route middleware to verify a token
apiRoutes.use((req, res, next) => {
    // look for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, app.get('superSecret'), (err, decoded) => {
            if (err) {
                res.status(403);
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(403);
        return res.json({
            success: false,
            message: 'No token provided'
        });
    }
});

// route to return all users (GET http://localhost:8080/api/users)
// Switch to Postman after TODO: 3 and have tested TODO: 1 in browser 


// DONE: 3 apply the routes to our application with the prefix /api
apiRoutes.get('/users', (req, res) => {
    User.find({}, '-password', (err, user) => {
        if (err) {
            res.json(err);
        } else {
            res.json(user);
        }
    });
});

app.use('/api', apiRoutes);

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Hosting at http://localhost:' + port);