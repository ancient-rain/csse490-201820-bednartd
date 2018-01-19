const express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), // mongodb connection
    bodyParser = require('body-parser'), // parse info from POST
    methodOverride = require('method-override');  // used to manipulate POST data
const BOOK = mongoose.model('Book');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride( (req) => {
    if (req.body && typeof req.body == 'object' && '_method' in req.body) {
        const method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

function handleError(err, res, msg, statusCode) {
    res.status(statusCode);
    err.status = statusCode;
    err.message = msg;
    res.json({ message: err.status + ' ' + err }); // shorter but works
}

function createReview(req, res, book) {
    let thisReview;
    book.reviews.push({
        review: req.body.review,
        author: req.body.author,
        when: req.body.when,
        stars: req.body.stars
    });
    book.save( (err, book) => {
        if (err) {
            handleError(err, res, 'Could not add Review', 400);
        } else {
            thisReview = book.reviews[book.reviews.length - 1];
            res.status(201);
            res.json(thisReview); 
        }
    });
}

function deleteReview(req, res, book) {
    let thisReviewIndex = -1;
    if (book.reviews.length) {
        for (let i = 0; i < book.reviews.length; i++) {
            if (book.reviews[i]._id === req.params.reviewid) {
                thisReviewIndex = i;
                break;
            }
        }
        if (thisReviewIndex < 0) {
            handleError(new Error(), res, 'Could not find review to delete', 404);
        } else {
            book.reviews.splice(thisReviewIndex, 1);
            book.save( (err) => {
                if (err) {
                    handleError(err, res, 'Could not delete Review', 400);
                } else {
                    res.status(204);
                    res.json(null);
                }
            });
        }

    } else {
        handleError(new Error(), res, 'Could not delete Review', 400);
    }
}

function updateReview(req, res, book) {
    let thisReview;
    if (book.reviews.length) {
        thisReview = book.reviews.filter( (review) => {
            return review._id == req.params.reviewid;
        })[0];

        if (!thisReview) {
            handleError(new Error(), res, 'Not Found', 404);
        } else {
            thisReview.review = req.body.review;
            thisReview.author = req.body.author;
            thisReview.when = req.body.when;
            thisReview.stars = req.body.stars;
            book.save( (err, book) => {
                if (err) {
                    handleError(err, res, 'Could not update Review', 400);
                } else {
                    res.json(book.reviews.filter( (review) => {
                        return review._id == req.params.reviewid;
                    })[0]);
                }
            });
        }
    } else {
        handleError(new Error(), res, 'Could not update Review', 400);
    }
}

// READY to build our API
router.route('/')
    // GET all books
    .get( (req, res) => {
        BOOK.find({},  (err, books) => {
            if (err) {
                handleError(err, res, 'Not Found', 404);
            } else {
                res.json(books);// shorter but works
            }
        });
    })
    // ADD a book
    .post((req, res) => {
        BOOK.create({
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author,
            coverImage: req.body.coverImage,
            printType: req.body.printType,
            pageCount: req.body.pageCount,
            publisher: req.body.publisher,
            publishedDate: req.body.publishedDate,
            webReaderLink: req.body.webReaderLink,
            reviews: []
        }, (err, book) => {
            if (err) {
                handleError(err, res, 'Could not save book', 500);
            } else {
                res.json(book);
            }
        });
    });

router.route('/:bookid')
    // GET book by id
    .get( (req, res) => {
        if (req.params && req.params.bookid) {
            BOOK.findById(req.params.bookid, (err, book) => {
                if (err) {
                    handleError(err, res, 'Not Found', 404);
                } else {
                    res.json(book); // shorter but works
                }
            });
        } else {
            handleError(new Error(), res, 'GET error, problem retrieving data', 404);
        }
    });

router.route('/:bookid/reviews')
    // TODO CREATE a review for this book. Use JavaScript to update the reviews array.
    .post( (req, res) => {
        if (req.params && req.params.bookid) {
            BOOK.findById(req.params.bookid, (err, book) => {
                if (err) {
                    handleError(err, res, 'Book Not Found', 404);
                } else {
                    createReview(req, res, book);
                }
            });
        } else {
            handleError({}, res, 'GET error, problem retrieving data', 404);
        }
    });

router.route('/:bookid/reviews/:reviewid')
    // TODO UPDATE single review for single book.
    // Get book first, then use JavaScript to search for the review
    .put( (req, res) => {
        if (req.params.bookid && req.params.reviewid) {
            BOOK.findById(req.params.bookid,  (err, book) => {
                if (err) {
                    handleError(err, res, 'Book Not Found', 404);
                } else {
                    updateReview(req, res, book);
                }
            });
        } else {
            handleError(new Error(), res, 'GET error, problem retrieving data', 404);
        }
    })
    // DELETE single review for single book
    // Get book first, then use JavaScript to search for the review
    // Remove review from array and save book
    .delete( (req, res) => {
        if (req.params.bookid && req.params.reviewid) {
            BOOK.findById(req.params.bookid, (err, book) => {
                if (err) {
                    handleError(err, res, 'Book Not Found', 404);
                } else {
                    deleteReview(req, res, book);
                }
            });
        } else {
            handleError(new Error(), res, 'GET error, problem retrieving data', 404);
        }
    });

module.exports = router;
