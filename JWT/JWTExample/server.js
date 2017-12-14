// =======================
// get the packages we need
// =======================
const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const morgan      = require('morgan');
const mongoose    = require('mongoose');

mongoose.Promise = global.Promise;

const jwt    = require('jsonwebtoken');   // used to create, sign, 
//  and verify tokens
const config = require('./config');       // get our config file
const User   = require('./models/user');  // get our mongoose model
    
// =======================
// configuration =========
// =======================
const port = process.env.PORT || 8080;    
mongoose.connect(config.database, {
    useMongoClient: true
}); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
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
});

// API ROUTES -------------------
// we'll get to these in a second

// TODO: 2 work on the apiRoutes 

// get an instance of the router for api routes

// TODO: 4 route to authenticate a user 
// (POST http://localhost:8080/api/authenticate)
// Test in Postman

// route to show a random message (GET http://localhost:8080/api/)

// TODO: 5 route middleware to verify a token
// route middleware to verify a token

// route to return all users (GET http://localhost:8080/api/users)
// Switch to Postman after TODO: 3 and have tested TODO: 1 in browser 


// TODO: 3 apply the routes to our application with the prefix /api


// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);