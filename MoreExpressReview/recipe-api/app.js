const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

// Mongoose needs us to specify the type of promise we should use
mongoose.Promise = global.Promise; 

// TODO: Create refrence to route handler file for handling requests 
// on /recipes routes
const recipes = require('./routes/recipes');

const app = express();

//TODO: Connect to db
const dbURI = 'mongodb://localhost/cookbookdb';
mongoose.connect(dbURI, {
    useMongoClient: true
}, err => {
    if (err) {
        console.log(`ERROR connecting to ${dbURI}. ${err}`);
    } else {
        console.log(`Successfully connected to ${dbURI}.`);
    }
}); 

app.use(cors());

// uncomment line below after placing your favicon in /public/images
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// TODO: mount /recipes route handlers here
app.use('/recipes', recipes);

app.use('/', (req, res) => {
    res.send("Welcome to the recipe api. Please use the /recipes route to access the full api.");
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // respond with the error
    res.status(err.status || 500);
    res.json(err);
});

module.exports = app;
