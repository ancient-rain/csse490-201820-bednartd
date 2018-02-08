import { Session } from './session.model';

export class Schedule {
    constructor(
        public startDate: string,
        public numberOfSessions: string,
        public sessions: [Session]
    ) { }
}
