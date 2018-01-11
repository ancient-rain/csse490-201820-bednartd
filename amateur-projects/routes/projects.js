const express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), // mongodb connection
    bodyParser = require('body-parser'), // parse info from POST
    methodOverride = require('method-override'), // used to manipulate POST data
    jwt = require('express-jwt');
const PROJECT = mongoose.model('Project');

const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

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

function handleError(err, res, msg, statusCode) {
    res.status(statusCode);
    err.status = statusCode;
    err.message = msg + err.message;
    res.json({
        message: err.status + ' ' + err
    });
}

function makeComment(req, res, project) {
    const comment = {
        commentText: req.body.comment,
        author: req.payload.username
    };
    project.comments.push(comment);
    project.save((err, p) => {
        if (err) {
            handleError(err, res, 'Comment could not be handled');
        } else {
            res.json(p);
        }
    });
}

router.route('/')
    //GET all projects
    .get((req, res) => {
        PROJECT.find({}, (err, projects) => {
            if (err) {
                handleError(err, res, 'Not Found', 404);
            } else {
                res.json(projects);
            }
        });
    })
    //ADD a project
    .post(auth, (req, res) => {
        console.log(req.body);
        console.log(req.payload);
        PROJECT.create({
            name: req.body.name,
            description: req.body.description,
            comments: [],
            email: req.body.email,
            owner: req.payload.username
        }, (err, project) => {
            if (err) {
                res.statusCode = 400;
                err.statusCode = 400;
                res.json(err);
            } else {
                res.json(project);
            }
        });
    });

router.route('/:projectId')
    .get((req, res) => {
        if (req.params && req.params.projectId) {
            PROJECT.findById(req.params.projectId, (err, project) => {
                if (err) {
                    handleError(err, res, 'Not Found', 404);
                } else {
                    res.json(project);
                }
            });
        } else {
            handleError(new Error(), res, 'GET error, problem retrieving data', 404);
        }
    })
    // TODO: Implement the request handler for this request 
    .put((req, res) => {
        //  TODO: Your code should go here.
        handleError(new Error("replace with msg"), res, 
            "Problem updating project in db.", 400);
    })

    // TODO: Implement the request handler for this request 
    .delete((req, res) => {
        //  TODO: Your code should go here.
        handleError(new Error("replace with msg"), res, 
            "Problem deleting project from db.", 400);
    });

// ADD a comment
router.route('/:projectId/comments')
    // TODO: Implement the request handler for this request 
    .post((req, res) => {
        //  TODO: Your code should go here.
        handleError(new Error("replace with msg"), res, 
            "Problem adding a comment to this project.", 400);
    });


router.route('/:projectId/comments/:commentId')
    // REMOVE a comment
    // TODO: Implement the request handler for this request 
    .delete(
        (req, res) => {
            if (!req.params.projectId || !req.params.commentId) {
                handleError({}, res, 'Not found, projectId and commentId are both required.', 404);
                return;
            }
            PROJECT
                .findById(req.params.projectId)
                .select('comments')
                .exec(
                    // TODO:  Started the shell of this solution for you. 
                    // Finish or change the format of this if you like.
                );
        }
    );

module.exports = router;