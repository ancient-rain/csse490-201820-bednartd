import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import methodOverride from 'method-override'; 
import jwt from 'express-jwt';
import config from '../config';  


const reviewsModel = mongoose.model('Review');
const router = express.Router();

/*  auth is authentication middleware. 
    TODO: Use as first middleware to secure protected routes 
*/
const auth = jwt({
    secret: config.secret,
    /* req.payload contains the payload of the decoded token */
    userProperty: 'payload'
});

//  TODO: Use this function to handle ALL errors that the various 
//  requests may generate.
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

    /*  Post a new book-review */
    //  TODO: Make this an authenticated request
    .post((req, res) => {
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

/*  oute middleware to validata :id for rest of API */
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

/*  Build the REST operations at /book-reviews/:id */
router.route('/:id')
    /*  Get book-review with the given :id */
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

    /*  Update book-review with the given :id */
    //  TODO: Impletment the request handler for this request.
    //  Be sure to return appropriate http status codes if error.
    //  Also, make this an authenticated request
    .put( (req, res) => {   
        res.status(400);
        handleError(new Error("replace with msg"), res, 
            "Problem updating review in db.");
    })

    /*  Deleting of reviews is not allowed in this app. */
    //  TODO: Impletment the request handler for this request so that 
    //  deletion is NOT allowed.  Be sure to send the appropriate http
    //  status code.
    .delete((req, res) =>{
        //  All your code should go here.
    });

export default router;