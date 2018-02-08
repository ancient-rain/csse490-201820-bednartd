import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

function numberOfSessionValidator(control: FormControl) {
  const value: number = control.value || 1;
  const valid = value > 0;
  return valid ? null : { numberOfSessions: true };
}

function dateValidator({ value }: FormGroup) {
  const [first, second, third] = Object.keys(value || {});
  let valid = true;

  if (value[second]) {
    valid = value[first] < value[second];
    if (value[third]) {
      valid = value[first] < value[third] && value[second] < value[third];
    }
  }

  return valid ? null : { date: true };
}

@Component({
  selector: 'app-generate-schedule',
  templateUrl: './generate-schedule.component.html',
  styleUrls: ['./generate-schedule.component.css']
})
export class GenerateScheduleComponent implements OnInit {

  genSchedule: FormGroup;
  days: any;

  constructor(fb: FormBuilder, private _router: Router) {
    this.days = [];
    this.genSchedule = fb.group({
      'sessionDays': new FormControl('', Validators.required),
      'numberOfSessions': new FormControl('', [Validators.required, numberOfSessionValidator]),
      'startWeekNumber': new FormControl('', Validators.required),
      'datesGroup': fb.group({
        'startDate': new FormControl('', Validators.required),
        'breakStartDate': new FormControl('', Validators.required),
        'resumeDate': new FormControl('', Validators.required)
      }, { validator: dateValidator })
    });
  }

  ngOnInit() {
  }

  generate(value: any, valid: boolean) {
    if (valid) {
      console.log('Generating', this.days);
      console.log('sessionDays', value.sessionDays);
      console.log('numberOfSessions', value.numberOfSessions);
      console.log('startWeekNumber', value.startWeekNumber);
      console.log('startDate', this.filterDate(value.datesGroup.startDate));
      console.log('breakStartDate', this.filterDate(value.datesGroup.breakStartDate));
      console.log('resumeDate', this.filterDate(value.datesGroup.resumeDate));
    }
    // this._router.navigate(['/session']);
  }

  filterDate(date: Date): string {
    const day = date.getUTCDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  onChange(day: string, event) {
    if (event.checked) {
      this.days.push(day);
    } else {
      const index = this.days.findIndex(x => x.value === day);
      this.days.splice(index, 1);
    }
  }

}
