import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generate-schedule',
  templateUrl: './generate-schedule.component.html',
  styleUrls: ['./generate-schedule.component.css']
})
export class GenerateScheduleComponent implements OnInit {

  title: 'Generate a Schedule';
  genSchedule: FormGroup;

  constructor(fb: FormBuilder, private _router: Router) {
    this.genSchedule = fb.group({
      'sessionDays': new FormControl('', Validators.required),
      'startDate': new FormControl('', Validators.required),
      'startWeekNumber': new FormControl('', Validators.required),
      'breakStartDate': new FormControl('', Validators.required),
      'resumeDate': new FormControl('', Validators.required),
      'numberOfSessions': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  generate(value: any, valid: boolean) {
    if (valid) {
      console.log('Generating');
      console.log('sessionDays', value.sessionDays);
      console.log('startDate', value.startDate);
      console.log('startWeekNumber', value.startWeekNumber);
      console.log('breakStartDate', value.breakStartDate);
      console.log('resumeDate', value.resumeDate);
      console.log('numberOfSessions', value.numberOfSessions);
    }
    // this._router.navigate(['/session']);
  }

}
