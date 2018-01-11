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

function updateProject(project, req) {
    project.name = req.body.name;
    project.description = req.body.description;
    project.email = req.body.email;
}

function createComment(req, res, project) {
    let thisComment;
    project.comments.push({
        author: req.body.author,
        commentText: req.body.commentText,
        createdOn: req.body.createdOn
    });
    project.save((err, project) => {
        if (err) {
            handleError(err, res, 'Could not add Comment', 400);
        } else {
            const commentsLen = project.comments.length;
            thisComment = project.comments[commentsLen - 1];
            res.status(200);
            res.json(thisComment);
        }
    });
}

function deleteComment(req, res, project) {
    let thisCommentIndex = -1;
    if (project.comments.length) {
        thisCommentIndex = findComment(req, project);
        if (thisCommentIndex < 0) {
            handleError(new Error(), res, 'Could not find Comment to delete', 404);
        } else {
            project.comments.splice(thisCommentIndex, 1);
            project.save((err) => {
                if (err) {
                    handleError(err, res, 'Could not delete Comment', 400);
                } else {
                    res.status(204);
                    res.json(null);
                }
            });
        }
    } else {
        handleError(new Error(), res, 'No Comments to delete', 400);
    }
}

function findComment(req, project) {
    for (let i = 0; i < project.comments.length; i++) {
        if (project.comments[i]._id == req.params.commentId) {
            return i;
        }
    }
    return -1;
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
    // DONE: Implement the request handler for this request 
    .put(auth, (req, res) => {
        PROJECT.findById(req.params.projectId, (err, project) => {
            if (err) {
                handleError(new Error("Could not update project."), res,
                    "Project could not be found", 404);
            } else {
                updateProject(project, req);
                project.save((err, updatedProject) => {
                    if (err) {
                        handleError(new Error("Could not update project."), res,
                            "Problem updating project in db.", 400);
                    } else {
                        res.json(updatedProject);
                    }
                });
            }
        });

    })

    // DONE: Implement the request handler for this request 
    .delete(auth, (req, res) => {
        PROJECT.findByIdAndRemove(req.params.projectId)
            .exec(err => {
                if (err) {
                    handleError(err, res, "Problem deleting project from db.", 400);
                } else {
                    res.status(204);
                    res.json(null);
                }
            });
    });

// ADD a comment
router.route('/:projectId/comments')
    // DONE: Implement the request handler for this request 
    .post(auth, (req, res) => {
        if (req.params && req.params.projectId) {
            PROJECT.findById(req.params.projectId, (err, project) => {
                if (err) {
                    handleError(err, res, 'Project Not Found', 404);
                } else {
                    createComment(req, res, project);
                }
            });
        } else {
            handleError({}, res, "GET error, problem retrieving project data", 404);
        }
    });

// REMOVE a comment
router.route('/:projectId/comments/:commentId')
    // DONE: Implement the request handler for this request 
    .delete(auth, (req, res) => {
        if (!req.params.projectId || !req.params.commentId) {
            handleError({}, res, 'Not found, projectId and commentId are both required.', 404);
            return;
        }

        PROJECT.findById(req.params.projectId, (err, project) => {
            if (err) {
                handleError(err, res, 'Project Not Found', 404);
            } else {
                deleteComment(req, res, project);
            }
        });
    });

module.exports = router;