const scheduleComponentNames = ["Week", "Session", "Reading", "Due", "Topics", "Resources", "Programs"];
const fs = require('fs');
let info;
let slidesArray;
let programsArray;
let progsDue;


module.exports = class ScheduleSession {
    constructor(session, sessionName, slides, programs, programsDue) {
        slidesArray = slides;
        programsArray = programs;
        progsDue = programsDue;
        this.week = session.week;
        this.session = session.sessionNumber;
        this.sessionDate = session.sessionDate;
        this.sessionName = sessionName;
        this.processFileData();
        this.scheduleComponents = this.createScheduleComponents();

    }

    static getHeaders() {
        return scheduleComponentNames;
    }
    

    createScheduleComponents() {
        const schedCompArray = [];
        for (let i = 0; i < scheduleComponentNames.length; i++) {
            const scheduleComponent = {
                name: scheduleComponentNames[i],
                values: this.getValues(i)
            };
            schedCompArray.push(scheduleComponent);
        }
        return schedCompArray;
    }

    getValues(index) {
        switch (index) {
            case 0:
                return this.week;
            case 1:
                return `${this.session} ${this.sessionDate}`;
            case 2:
                return this.getReading();
            case 3:
                return this.getDue();
            case 4:
                return this.getTopics();
            case 5:
                return this.getResources();
            case 6:
                return this.getPrograms();

        }
    }

    processFileData() {
        const sessionFile = `./ClassMaterials/${this.sessionName}/info.txt`;

        // fs.readFileSync(sessionFile, 'utf8', function (err, data) {
        //     if (err) {
        //         console.log(err);
        //     }
        //     else {
        //         const buffer = data.toString();
        //         info = buffer.split('\n');
        //     }
        // });
        const content = fs.readFileSync(sessionFile, 'utf8');
        const buffer = content.toString();
        info = buffer.split('\r\n');
        return;
    }

    getReading() {
        let start, end = 0;
        for (let i = 0; i < info.length; i++) {
            if (info[i] == 'Reading') {
                start = i + 1;
            }
            else if (info[i] == "End Reading") {
                end = i;
                break;
            }
        }

        const readingArray = [];
        for (let i = start; i < end; i++) {
            readingArray.push(info[i]);
        }
        return readingArray;
    }

    getDue() {
        // let start, end = 0;
        // for (let i = 0; i < info.length; i++) {
        //     if (info[i] == 'Due\n') {
        //         start = i + 1;
        //     }
        //     else if (info[i] == "End Due\n") {
        //         end = i;
        //         break;
        //     }
        // }

        // const dueArray = [];
        // for (let i = start; i < end; i++) {
        //     dueArray.push(info[i]);
        // }
        const array = [];
        for(let i = 0; i < progsDue.length; i++) {
            array.push(
                `<a href="${progsDue[i].link}">${progsDue[i].programName}</a>`
            );
        }

        return array;
    }

    getTopics() {
        let start, end = 0;
        for (let i = 0; i < info.length; i++) {
            if (info[i] == 'Topics') {
                start = i + 1;
            }
            else if (info[i] == "End Topics") {
                end = i;
                break;
            }
        }

        const topicArray = [];
        for (let i = start; i < end; i++) {
            topicArray.push(info[i]);
        }
        return topicArray;
    }

    getResources() {
        for (let i = 0; i < slidesArray.length; i++) {
            if (slidesArray[i] == `SessionStartName: ${this.sessionName}`) {
                const sessionIndex = i - 1;
                let sessionResources = '';
                let sessionLink = slidesArray[sessionIndex];

                sessionLink = sessionLink.split(': ')[1];
                sessionResources = `<a href="${sessionLink}">${this.sessionName}</a>`;

                return sessionResources;
            }
        }
    }

    getPrograms() {
        const array = [];
        for (let i = 0; i < programsArray.length; i++) {
            if (programsArray[i] == `SessionStartName: ${this.sessionName}`) {
                let programName = programsArray[i - 2];
                let programLink = programsArray[i - 1];

                programName = programName.split(': ')[1];
                programLink = programLink.split(': ')[1];

                programName = `<a href="${programLink}">${programName}</a>`;
                array.push(programName);
            }
        }

        return array;
    }

};
