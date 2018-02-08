export class Schedule {
    constructor(
        public sessionNumber: number,
        public sessionWeekDay: string,
        public sessionDate: string,
        public week: string,
        public scheduleSession: {
            week: string,
            session: number,
            sessionDate: string,
            sessionName: string,
            scheduleComponents: [{
                name: string,
                values: any
            }]
        }
        ) { }
}
