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
  sessions: Session[];

  constructor(private scheduleService: ScheduleService) {
    this.scheduleService.getHeaders().subscribe(result => {
      this.headers = result;
      console.log(this.headers);
    });
    this.scheduleService.getSchedule().subscribe(result => {
      this.sessions = result;
      console.log(this.sessions);
    });
  }

  ngOnInit() {
  }

}
