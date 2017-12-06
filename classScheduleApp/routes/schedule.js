const express = require('express'),
    router = express.Router(),
    SCHEDULE = require('../models/schedule');

function handleError(err, res, statusCode, next) {
    res.status(statusCode);
    err.status = statusCode;
    next(err);
}

function createSchedule(req) {
    return {
        sessionDays: req.body.sessionDays,
        startDate: req.body.startDate,
        startWeekNumber: req.body.startWeekNumber,
        breakStartDate: req.body.breakStartDate,
        resumeDate: req.body.resumeDate,
        numberOfSessions: req.body.numberOfSessions,
        sessions: req.body.sessions
    };
}

function updateSchedule(schedule, req) {
    schedule.sessionDays = req.body.sessionDays;
    schedule.startDate = req.body.startDate;
    schedule.startWeekNumber = req.body.startWeekNumber;
    schedule.breakStartDate = req.body.breakStartDate;
    schedule.resumeDate = req.body.resumeDate;
    schedule.numberOfSessions = req.body.numberOfSessions;
    schedule.sessions = generateSessions(schedule);
    // console.log(schedule);
}

function generateSessions(schedule) {
    const sessionDays = schedule.sessionDays,
        startDate = schedule.startDate,
        startWeekNumber = schedule.startWeekNumber,
        breakStartDate = schedule.breakStartDate,
        resumeDate = schedule.resumeDate,
        numberOfSessions = schedule.numberOfSessions,
        firstDayDiff = getDateVal(sessionDays.charAt(0));

    let sessionIndex = 0,
        dateDiff = 0,
        weekNumber = startWeekNumber,
        curDate = startDate,
        sessions = [],
        curDay = curDate.getDate(),
        isBreakCalculated = false;

    curDate.setDate(curDay + firstDayDiff);

    for (let i = 1; i <= numberOfSessions; i++) {
        curDay = curDate.getDate();
        // reset the day of the week
        if (sessionIndex >= sessionDays.length) {
            sessionIndex = 0;
            weekNumber++;
        }

        const sessionDay = sessionDays.charAt(sessionIndex);
        const session = createSession(sessionDay, i, weekNumber, curDate);
        sessions[i] = session;
        // DATA IS CORRECT IN THIS CONSOLE LOG
        // console.log(sessions);

        // update curDate
        dateDiff = getDateDifference(sessionDays, sessionIndex);
        curDate.setDate(curDay + dateDiff);

        // check to make sure that curDate is not during break period
        if (!isBreakCalculated && curDate.valueOf() > breakStartDate.valueOf()) {
            curDate = resumeDate;
            curDay = resumeDate.getDate();
            curDate.setDate(curDay + firstDayDiff);
            isBreakCalculated = true;
        }

        sessionIndex++;
    }

    // removes the null object when we create the sessions array object 
    sessions.shift();
    // DATE VALUES GET CHANGED OUTSIDE OF HERE
    // console.log(sessions);
    return sessions;
}

function createSession(sessionDay, sessionNumber, weekNumber, date) {
    const sessionDayName = getSessionDay(sessionDay);
    return {
        sessionNumber: sessionNumber,
        sessionWeekDay: sessionDayName,
        sessionDate: date,
        week: weekNumber
    };
}

function getSessionDay(sessionDay) {
    switch (sessionDay) {
        case 'M':
            return 'Monday';
        case 'T':
            return 'Tuesday';
        case 'W':
            return 'Wednesday';
        case 'R':
            return 'Thursday';
        case 'F':
            return 'Friday';
        default:
            return 'Saturday';
    }
}

function getDateDifference(sessionDays, sessionIndex) {
    const curDay = getDateVal(sessionDays.charAt(sessionIndex));
    let nextIndex = sessionIndex + 1;

    if (nextIndex >= sessionDays.length) {
        // return the number of days to the next Monday
        return 7 - curDay + getDateVal(sessionDays.charAt(0));
    } else {
        const nextDay = getDateVal(sessionDays.charAt(nextIndex));
        return nextDay - curDay;
    }
}

function getDateVal(day) {
    switch (day) {
        case 'M':
            return 0;
        case 'T':
            return 1;
        case 'W':
            return 2;
        case 'R':
            return 3;
        case 'F':
            return 4;
        default:
            return 5;
    }
}

/* GET schedule listing. */
router
    .get('/', function (req, res, next) {
        SCHEDULE.find({}, (err, schedules) => {
            if (err) {
                handleError(new Error('Could not find schedules'), res, 404, next);
            } else {
                res.json(schedules);
            }
        });
    })
    // Create new schedule
    .post('/', (req, res, next) => {
        SCHEDULE.create(createSchedule(req), (err, schedule) => {
            if (err) {
                handleError(new Error('Could not add schedule'), res, 400, next);
            } else {
                updateSchedule(schedule, req);
                res.json(schedule);
            }
        });
    });

module.exports = router;
