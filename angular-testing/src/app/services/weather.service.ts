import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/* See https://blog.thoughtram.io/angular/2016/05/23/opaque-tokens-in-angular-2.html
  providers for these are defined in app.module.ts */
export const WEATHER_URL_BASE = new InjectionToken<string>('WeatherUrlBase');
export const WEATHER_URL_SUFFIX = new InjectionToken<string>('WeatherUrlSuffix');

export interface WeatherResult {
  place: string;
  temperature: number;
  humidity: number;
}

@Injectable()
export class WeatherService {
  constructor(
      private http: HttpClient,
      /*  Using DI for urlBase and urlSuffix makes it simpler to replace
          the real weather service if needed. */
      @Inject(WEATHER_URL_BASE) private urlBase: string,
      @Inject(WEATHER_URL_SUFFIX) private urlSuffix: string) {
  }

  getWeather(city: string): Observable<any> {
    return this.http
        .get(this.urlBase + city + this.urlSuffix)
        .filter(this._hasResult)
        .map(this._parseData)
        .catch((err: HttpErrorResponse) => Observable.of({failure: err}));
  }

  private _hasResult(data): boolean {
    return data['cod'] !== '404' && data.main;
  }

  private _parseData(data): WeatherResult {
    return {
      place: data.name || 'unknown',
      temperature: data.main.temp,
      humidity: data.main.humidity
    };
  }

}
