import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {
  WEATHER_URL_BASE,
  WEATHER_URL_SUFFIX,
  WeatherService
} from './weather.service';

describe('WeatherService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherService,
        { provide: WEATHER_URL_BASE, useValue: '' },
        { provide: WEATHER_URL_SUFFIX, useValue: '' },
      ],
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
  });


  it('should be created', inject([WeatherService], (service: WeatherService) => {
    expect(service).toBeTruthy();
  }));

  /*The HttpTestingController API for matching requests is build 
    around three methods:
    1. expectOne(expr): expect exactly one request that matches
    2. expectNone(expr): expect that no requests matches
    3. match(expr): match the request but do not verify / assert
  */


});
