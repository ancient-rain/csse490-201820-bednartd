// =======================
// get the packages we need
// =======================
const express     = require('express');
const path = require('path');

const app         = express();
const bodyParser  = require('body-parser');
const morgan      = require('morgan');
const mongoose    = require('mongoose');

mongoose.Promise = global.Promise;

const config = require('./config');       // get our config file
const User   = require('./models/user');  // get our mongoose model

// TODO 3. require rose-fire token verifier for node

// =======================
// configuration =========
// =======================
const port = process.env.PORT || 9999;    
mongoose.connect(config.database, {
    useMongoClient: true
}); // connect to database

// TODO 4. create a rosefire token verifier instance with your rosefire 
// registry secret

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

// =======================
// routes ================
// =======================
// basic route
app.get('/', (req, res) => {
    res.send(`Hello! The API is at http://localhost:${port}/api`);
});

// TODO 0. Create a simple user using the model that we created earlier
// (GET http://localhost:9999/setup)
app.get('/setup', (req, res) => {

    // create a sample user
    const nick = new User({ 
        firstName: 'James', 
        lastName: 'Charles',
        email: 'charlesj@email.com',
        username: 'charlesj',
        admin: true 
    });

    // save the sample user
    nick.save(err => {
        if (err) {
            throw err;
        }
        console.log('User saved successfully');
        res.json({ success: true });
    });
});

// API ROUTES -------------------

// get an instance of the router for api routes
const apiRoutes = express.Router(); 

// route to show a random message (GET http://localhost:9999/api/)
apiRoutes.get('/', (req, res) => {
    res.json({ message: 'Welcome to the coolest API on earth!' });
});

// TODO 5. route middleware to verify a rosefire token


// route to return all users (GET http://localhost:9999/api/users)
// Switch to Postman after TODO: 3 and have tested TODO: 1 in browser
apiRoutes.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        res.json(users);
    });
});   

app.use('/api', apiRoutes);

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);