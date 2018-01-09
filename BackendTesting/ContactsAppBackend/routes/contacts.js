const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
/*  used to manipulate POST 
    data, e.g, extract PUT/DELETE methods 
    from request body 
*/

router.use(bodyParser.urlencoded({ extended: true }));
/*  Grab data encoded by 
    html forms in urls and store them in a 
    req.body object 
*/
router.use(methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        const method = req.body._method;
        delete req.body._method;
        return method;
    } 
    /*  grab the value of _method (e.g., put/delete) from req.body and 
        remove it 
    */
}));

// READY to build our API
router.route('/')
    // GET all contacts
    .get((req, res, next) => {
        mongoose.model('Contact').find({}, (err, contacts) => {
            if (err) {
                res.status(404);
                handleError(err, res, 'Contacts Not Found');
            } else {
                res.json(contacts);
            }
        });
    })
    .post((req, res) => { 
        mongoose.model('Contact').create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            homePhone: req.body.homePhone,
            cellPhone: req.body.cellPhone,
            birthDay: req.body.birthDay,
            website: req.body.website,
            address: req.body.address
        }, (err, contact) => {
            if (err) {
                res.status(400);
                handleError(err, res, 'Problem adding contact to db.');
            } else {
                res.status(201);
                res.json(contact);
            }
        });
    });

// route middleware to validata :id
router.param('id', (req, res, next, id) => {
    mongoose.model('Contact').findById(id, (err, contact) => {
        if (err || contact === null) {
            res.status(404);
            handleError(err, res, 'Not Found');
        } else {
            // once validation is done, save in the req
            req.id = id;
            next();
        }
    });
});

function handleError(err, res, msg) {
    err = new Error(msg);
    err.status = res.statusCode;
    res.json({ message: `${err.status} ${err}` });
}

router.route('/:id')
    .get((req, res) => {
        mongoose.model('Contact').findById(req.id, (err, contact) => {
            if (err) {
                res.status(404);
                handleError(err, res, 'GET error, problem retrieving data');
            } else {
                res.json(contact);
            }
        });
    })
    .put((req, res) => {
        mongoose.model('Contact').findById(req.id, (err, contact) => {
            contact.firstName = req.body.firstName || contact.firstName;
            contact.lastName = req.body.lastName || contact.lastName;
            contact.email = req.body.email || contact.email;
            contact.homePhone = req.body.homePhone || contact.homePhone;
            contact.cellPhone = req.body.cellPhone || contact.cellPhone;
            contact.birthDay = req.body.birthDay || contact.birthDay;
            contact.website = req.body.website || contact.website;
            contact.address = req.body.address || contact.address;
            contact.save((err, person) => {
                if (err) {
                    res.status(404);
                    handleError(err, res, 'Problem updating contact');
                } else {
                    res.json(person);
                }
            });
        });
    })
    .delete((req, res) => {
        mongoose.model('Contact').findByIdAndRemove(req.id)
            .exec((err, contact) => {
                if (err) {
                    res.status(404);
                    handleError(err, res, 'Problem deleting contact');
                } else {
                    res.status(204);
                    res.json(null);
                }
            });
    });

module.exports = router;

