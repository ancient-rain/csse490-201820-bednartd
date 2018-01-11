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
    //  HINT: Protect desired routes in ./projects.js using an appropriate
    //  middleware.
    User.findOne({
        username: req.body.username
    }, (err, user) => {
        if (err) {
            sendJSONresponse(res, 401, {
                "message": "Error loggin in!"
            });
        } else if (!user) {
            console.log(user);
            sendJSONresponse(res, 404, {
                "message": "Authentication failed, no user"
            });
        } else if (user) {
            let token;
            if (!user.validPassword(req.body.password)) {
                sendJSONresponse(res, 403, {
                    "message": "Authentication failed, wrong password"
                });
            } else {
                const payload = {
                    bio: user.bio,
                    email: user.email,
                    skillList: user.skillList,
                    token: user.token
                };
                token = user.generateJwt();
                sendJSONresponse(res, 200, {
                    "message": "Authentication successful!",
                    "token": token
                });
            }
        }
    });
};