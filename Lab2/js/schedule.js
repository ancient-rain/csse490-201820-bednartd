const fs = require('fs');
const session = require('./session.js');

let order;
let slides;
let programs;

module.exports = class Schedule {
    constructor(configObject) {
        this.setOrderArray();
        this.setSlidesArray();
        this.setProgramsArray();
        this.startDate = configObject.startDate;
        this.numberOfSessions = configObject.numberOfSessions;
        this.sessions = this.createSessions(configObject);
    }

    //returns an array of the sessions it creates for the schedule
    createSessions(configObject) {
        const sessions = [];
        for (let i = 0; i < configObject.numberOfSessions; i++) {
            //the first session is a special case
            if (i == 0) {
                sessions.push(new session(i + 1, configObject, 0, configObject.startWeekNumber, order[i], slides, programs));
            }
            else {
                const week = parseInt(sessions[i - 1].week);
                sessions.push(new session(i + 1, configObject, sessions[i - 1].sessionDate, week, order[i], slides, programs));
            }
        }
        return sessions;
    }

    setOrderArray() {
        const file = './ClassMaterials/order.txt';
        // fs.readFile(file, 'utf8', function (err, data) {
        //     if (err) {
        //         console.log(err);
        //     }
        //     else {
        //         const buffer = data.toString();
        //         order = buffer.split('\n');
        //         return;        
                
        //     }
        // });
        const content = fs.readFileSync(file, 'utf8');
        const buffer = content.toString();
        order = buffer.split('\r\n');
        return;
        
    }

    setSlidesArray() {
        const slidesFile = `./ClassMaterials/slides.txt`;

        const content = fs.readFileSync(slidesFile, 'utf8');
        const buffer = content.toString();
        slides = buffer.split('\r\n');
        return;
    }

    setProgramsArray() {
        const projectsFile = `./ClassMaterials/projects.txt`;

        // fs.readFile(projectsFile, 'utf8', function (err, data) {
        //     if (err) {
        //         console.log(err);
        //     }
        //     else {
        //         const buffer = data.toString();
        //         programs = buffer.split('\n');
        //     }
        // });
        const content = fs.readFileSync(projectsFile, 'utf8');
        const buffer = content.toString();
        programs = buffer.split('\r\n');
        return;
    }


};


