const ScheduleSession = require('./scheduleSession.js');

function addDueDate(sessionName, programs, sessionDate) {
    if(addDueDate.dueDates == null) {
        addDueDate.dueDates = [];
    }
    for(let i = 0; i < programs.length; i++) {
        if(programs[i] == `SessionStartName: ${sessionName}`) {
            const daysToAdd = programs[i + 1].split(": ")[1];
            const startDate = getDate(sessionDate);
            const programName = programs[i - 2].split(": ")[1];
            const programLink = programs[i - 1].split(": ")[1];
            startDate.setDate(startDate.getDate() + parseInt(daysToAdd));
            addDueDate.dueDates.push({
                dueDate: startDate,
                programName: programName,
                link: programLink
            });
        }
    }

}

function getDate(date) {
    const dateArray = date.toString().split("/");
    return new Date(dateArray[2], dateArray[0] - 1, dateArray[1]);
}

module.exports = class Session {
    constructor(sessionNumber, configObject, lastSessionDate, lastSessionWeek, sessionName, slides, programs) {
        this.sessionNumber = sessionNumber;
        this.sessionWeekDay = 0;
        this.sessionDate = this.getSessionDate(sessionNumber, configObject, lastSessionDate);
        addDueDate(sessionName, programs, this.sessionDate);
        const programDue = this.checkDueDates();
        this.sessionWeekDay = this.getDate(this.sessionDate).getDay();
        this.sessionWeekDay = this.getWeekDay(this.sessionWeekDay);

        //first session sets its week the the configObject's startWeekNumber
        if (lastSessionDate == 0) {
            this.week = lastSessionWeek;
        }
        else {
            //if a new week begins, add 1 to the previous session's week value
            if (this.getDate(this.sessionDate).getDay() <= this.getDate(lastSessionDate).getDay()) {
                this.week = lastSessionWeek + 1;
            }
            //otherwise it remains the same week
            else {
                this.week = lastSessionWeek;
            }
        }
        this.scheduleSession = new ScheduleSession(this, sessionName, slides, programs, programDue);
        
    }

    checkDueDates() {
        const programsDue = [];
        const date = this.getDate(this.sessionDate);
        for(let i = 0; i < addDueDate.dueDates.length; i++) {
            const currentDate = addDueDate.dueDates[i].dueDate;
            if(currentDate.getTime() === date.getTime()) {
                programsDue.push(addDueDate.dueDates[i]);
            }
        }
        return programsDue;
    }

    getSessionDate(sessionNumber, configObject, lastSessionDate) {
        const date = this.getDate(lastSessionDate);
        let daysToAdd;

        //first session
        if (lastSessionDate == 0) {
            if (!this.getSessionDays(configObject).includes(this.getDate(configObject.startDate).getDay())) {
                let temp = this.getDate(configObject.startDate).getDay();
                let days = 0;
                while (!this.getSessionDays(configObject).includes(temp)) {
                    days++;
                    if (temp < 7) {
                        temp++;
                    }
                    else {
                        temp = 0;
                    }
                }
                const retDate = this.getDate(configObject.startDate);
                retDate.setDate(retDate.getDate() + days);
                return (retDate.getMonth() + 1) + '/' + retDate.getDate() + "/" + retDate.getFullYear();
            }
            return configObject.startDate;
        }
        else {
            const weekday = date.getDay();
            const sessionDays = this.getSessionDays(configObject);
            const index = sessionDays.indexOf(weekday);

            //if index is at end of array, this session would start a new week
            if (index == sessionDays.length - 1) {
                daysToAdd = 7 - sessionDays[index] + sessionDays[0];
            }
            //simply subtract days in between days otherwise
            else {
                daysToAdd = sessionDays[index + 1] - sessionDays[index];
            }
        }

        //sets number of days found above to last session date
        date.setDate(date.getDate() + daysToAdd);

        //if the session would be during break, set date to resume date
        if ((date >= this.getDate(configObject.breakStartDate)) && (date < this.getDate(configObject.resumeDate))) {
            if (!this.getSessionDays(configObject).includes(this.getDate(configObject.resumeDate).getDay())) {
                let temp = this.getDate(configObject.resumeDate).getDay();
                let days = 0;
                while (!this.getSessionDays(configObject).includes(temp)) {
                    days++;
                    if (temp < 7) {
                        temp++;
                    }
                    else {
                        temp = 0;
                    }
                }
                const retDate = this.getDate(configObject.resumeDate);
                retDate.setDate(retDate.getDate() + days);
                return (retDate.getMonth() + 1) + '/' + retDate.getDate() + "/" + retDate.getFullYear();
            }
            return configObject.resumeDate;
        }
        else {
            return (date.getMonth() + 1) + '/' + date.getDate() + "/" + date.getFullYear();
        }

    }

    //returns array of the indices of the days the class meets
    getSessionDays(configObject) {
        const days = [];
        const sessionDays = configObject.sessionDays;
        if (sessionDays.includes("M")) {
            days.push(1);
        }
        if (sessionDays.includes("T")) {
            days.push(2);
        }
        if (sessionDays.includes("W")) {
            days.push(3);
        }
        if (sessionDays.includes("R")) {
            days.push(4);
        }
        if (sessionDays.includes("F")) {
            days.push(5);
        }
        if (sessionDays.includes("S")) {
            days.push(6);
        }
        if (sessionDays.includes("U")) {
            days.push(0);
        }

        return days;
    }

    //converts configObject date into Date object
    getDate(date) {
        const dateArray = date.toString().split("/");
        return new Date(dateArray[2], dateArray[0] - 1, dateArray[1]);
    }

    getWeekDay(num) {
        switch (num) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";

        }
    }
};

