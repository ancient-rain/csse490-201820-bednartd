import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';

import {WeatherService, WeatherResult} from '../services/weather.service';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css']
})

export class WeatherComponent {
    weather: WeatherResult;
    weatherForm: FormGroup;

    constructor(weatherService: WeatherService) {
        this.weatherForm = new FormGroup({
          searchInput: new FormControl('')
        });
        this.weatherForm.controls['searchInput']
        .valueChanges
        .debounceTime(800)
        .switchMap(place => {
          console.log(place);
            return weatherService.getWeather(place);
        })
        .subscribe(
            (weather: WeatherResult) => {
                this.weather = weather;
            },
            error => console.error(error),
            () => console.log('Weather is retrieved')
        );
    }
}
