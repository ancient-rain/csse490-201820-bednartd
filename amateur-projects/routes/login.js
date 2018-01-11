const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.login = function(req, res) {
    //  TODO: allow registered users to login to access protected routes.
    //  Be sure to check error cases and return 404/401 http status codes, 
    //  as appropriate. A logged in user should receive a JWT generated 
    //  by model/users.js
    sendJSONresponse(res, 404, new Error("Some error message"));
    // HINT: Protect desired routes in ./projects.js using an appropriate
    // middleware.
};