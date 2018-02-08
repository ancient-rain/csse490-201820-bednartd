import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Schedule } from './../models/schedule.model';
import { Session } from './../models/session.model';
import 'rxjs/add/operator/catch';

@Injectable()
export class ScheduleService {
    private domainUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    generateSchedule(schedule) {
        console.log(schedule);
        const url = `${this.domainUrl}/gen-schedule`;
        const body = {
            'sessionDays': schedule.sessionDays,
            'numberOfSessions': schedule.numberOfSessions,
            'startWeekNumber': schedule.startWeekNumber,
            'startDate': schedule.startDate,
            'breakStartDate': schedule.breakStartDate,
            'resumeDate': schedule.resumeDate
        };
        return this.http.post<Schedule>(url, schedule)
            .catch((error: any) =>
                Observable.throw(error.json().error || 'POST error'));
    }

    getSchedule() {
        const url = `${this.domainUrl}/api/sessions`;
        return this.http.get<Session>(url)
            .catch((error: any) =>
                Observable.throw(error.json().error || 'Server error'));
    }

    getHeaders() {
        const url = `${this.domainUrl}/api/headers`;
        return this.http.get<any>(url)
            .catch((error: any) =>
                Observable.throw(error.json().error || 'Server error'));
    }

}
