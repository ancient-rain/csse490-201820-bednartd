const express = require('express');
const router = express.Router();
const Schedule = require('../js/schedule.js');
const ScheduleSession = require('../js/scheduleSession.js');
let schedule;

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    next();
});


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.route("/api/headers")
    .get((req, res) => {
        res.json(ScheduleSession.getHeaders());
    });

router.route("/api/sessions")
    .get((req, res) => {
        res.json(schedule.sessions);
    });

router.route('/gen-schedule')
    .post((req, res) => {
        schedule = new Schedule(req.body);
        res.json(schedule);
    });

module.exports = router;