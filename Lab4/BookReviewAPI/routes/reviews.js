const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override'); 
const jwt = require('express-jwt');
const config = require('../config');  


const reviewsModel = mongoose.model('Review');
const router = express.Router();

/*  auth is authentication middleware. 
    Use as first middleware to secure protected routes 
*/
const auth = jwt({
    secret: config.secret,
    /* req.payload contains the payload of the decoded token */
    userProperty: 'payload'
});

function handleError(err, res, msg) {
    err = new Error(err.message + msg);
    err.status = res.statusCode;
    res.json({ message: `${err.status} ${err}` });
}

router.use(bodyParser.urlencoded({extended: true}));
router.use(methodOverride((req, res) => {
    if(req.body && typeof req.body == 'object' && '_method' in req.body){
        /* look in urlencoded POST bodies and delete it */
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

/* Build the REST operations at the base of book-reviews */
router.route('/')
    /* Get all book-reviews */
    .get((req, res, next) => {
        reviewsModel.find({}, (err, reviews) => {
            if(err){
                res.status(404);
                handleError(err, res, 'Not Found');
            } else {
                res.json(reviews);
            }
        });
    })

    /* Post a new book-review */
    .post(auth, (req, res) => {
        reviewsModel.create({
            rating: req.body.rating,
            body: req.body.body,
            reviewer: req.body.reviewer,
            book: req.body.book,
            createdOn: req.body.createdOn
        }, (err, review) => {
            if (err){
                res.status(400);
                handleError(err, res, "Problem adding review to the db");
            } else {
                res.json(review);
            }
        });
    });

/* route middleware to validata :id for rest of API */
router.param('id', (req, res, next, id) => {
    reviewsModel.findById(id, (err, review) => {
        if(err || review === null){
            res.status(404);
            handleError(err, res, 'Not Found');
        } else{
            /* once validation is done, save new id in the req */
            req.id = id;
            next();
        }
    });
});

/* Build the REST operations at /book-reviews/:id */
router.route('/:id')
    /* Get book-review with the given :id */
    .get((req, res) => {
        reviewsModel.findById(req.id, (err, review) => {
            if(err){
                res.status(404);
                handleError(err, res, 'Problem retrieving review');
            } else {
                res.json(review);
            }
        });
    })

    /* Update book-review with the given :id */
    .put(auth, (req, res) => {        
        reviewsModel.findById(req.id, (err, review) => {
            if(err){
                res.status(404);
                handleError(err, res, 'Problem finding review to update');
            } else {
                review.rating = req.body.rating;
                review.body = req.body.body;
                review.reviewer = req.body.reviewer;
                review.book = req.body.book;
                review.createdOn = req.body.createdOn || Date.now();
                review.save((err, updatedReview) => {
                    if(err){
                        res.status(404);
                        handleError(err, res, 'Problem updating review');
                    } else {
                        res.json(updatedReview);
                    }
                });
            }
        });
    })

    /* Deleting of reviews is not allowed in this app. */
    .delete(auth, (req, res) =>{
        res.status(403);
        const err = new Error("Delete of reviews is not allowed.");
        handleError(err, res, 'Forbidden');
    });

module.exports = router;