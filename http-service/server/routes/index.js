const express = require('express');
const bodyParser = require('body-parser');
const fs =require('fs');
const path = require('path');

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({ title: 'Express' });
});

const dataFile  = path.join(__dirname, '../data.json');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
router.use((req, res, next) => {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, DELETE, GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

router.get('/api/comments', (req, res) => {
    fs.readFile(dataFile, (err, data) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});

router.post('/api/comments', (req, res) => {
    fs.readFile(dataFile, (err, data) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        const comments = JSON.parse(data);

        const newComment = {
            id: Date.now(),
            author: req.body.author,
            text: req.body.text,
        };

        comments.push(newComment);
        fs.writeFile(dataFile, JSON.stringify(comments, null, 4), (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(comments);
        });
    });
});

router.put('/api/comments/:id', (req, res) => {
    fs.readFile(dataFile, (err, data) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        const comments = JSON.parse(data);
        let idIndex = 0;
        const findCommentById = comments.filter(comment => {
            if(comment.id == req.params.id) {
                idIndex = comments.indexOf(comment);
                return comment;
            }
        });
        findCommentById[0].text = req.body.text;
        findCommentById[0].author = req.body.author;

        comments.splice(idIndex, 1, findCommentById[0]);
        fs.writeFile(dataFile, JSON.stringify(comments, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(comments);
        });
    });
});


router.delete('/api/comments/:id', (req, res) => {
    fs.readFile(dataFile, (err, data) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        const comments = JSON.parse(data);
        let idIndex = -1;
        const findCommentById = comments.filter(comment => {
            if(comment.id == req.params.id) {
                idIndex = comments.indexOf(comment);
                return comment;
            }
        });

        if(idIndex >= 0){
            comments.splice(idIndex, 1);
        }

        fs.writeFile(dataFile, JSON.stringify(comments, null, 4), (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(comments);
        });
    });
});

module.exports = router;
