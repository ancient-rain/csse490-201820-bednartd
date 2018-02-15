import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-observables-events-http',
  template: `<div class=main>
  <h2>Observable weather</h2>

  <mat-form-field>
    <input matInput type="text"
      placeholder="Enter city"
      [formControl]="searchInput">
  </mat-form-field>

  <h3>{{temperature}}</h3>
  </div>
  `,
  styles: []
})
export class ObservablesEventsHttpComponent implements OnInit {

  private baseWeatherURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
  private urlSuffix = '&units=imperial&appid=ca3f6d6ca3973a518834983d0b318f73';

  searchInput: FormControl = new FormControl();
  temperature: string;

  constructor(private http: HttpClient) {
    this.searchInput.valueChanges
    .debounceTime(200)
    .switchMap(city => this.getWeather(city))
    .subscribe(
      res => {
          this.temperature =
            `Current temperature is  ${res['main'].temp}F, ` +
            `humidity: ${res['main'].humidity}%`;
      },
      err => console.log(`Can't get weather. Error code: %s, URL: %s`, err.message, err.url)
    );
  }

  getWeather(city: string): Observable<any> {
    return this.http.get(this.baseWeatherURL + city + this.urlSuffix)
      .catch( err => {
        if (err.status === 404) {
          console.log(`City ${city} not found`) ;
          return Observable.of();    // empty observable
        }
      });
  }

  ngOnInit() {
  }

}
