import { Component, OnInit } from '@angular/core';
import { Session } from './../models/session.model';
import { ScheduleService } from '../services/schedule.service';


@Component({
  selector: 'app-view-schedule',
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.css']
})
export class ViewScheduleComponent implements OnInit {

  headers: any[];
  columnIds: any[];
  sessions: any[];

  constructor(private scheduleService: ScheduleService) {
    this.scheduleService.getHeaders().subscribe(result => {
      const array = [];
      this.headers = result;
      for (let i = 0; i < result.length; i++) {
        array.push(result[i].toLowerCase());
      }
      this.columnIds = array;
      console.log(this.columnIds);
    });
    this.scheduleService.getSchedule().subscribe(result => {
      const array = [];
      for (let i = 0; i < result.length; i++) {
        const scheduleComponent = result[i].scheduleSession.scheduleComponents;
        array.push({
          week: scheduleComponent[0].values,
          session: scheduleComponent[1].values,
          reading: scheduleComponent[2].values,
          due: scheduleComponent[3].values,
          topics: scheduleComponent[4].values,
          resources: scheduleComponent[5].values,
          programs: scheduleComponent[6].values
        });
      }
      this.sessions = array;
      console.log(this.sessions);
    });
  }

  ngOnInit() {
  }

}
