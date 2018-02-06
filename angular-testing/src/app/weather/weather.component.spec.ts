import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { WeatherComponent } from './weather.component';
import { WeatherService } from '../services/weather.service';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [WeatherComponent],
      /*  WeatherComponent expects WeatherService to be injected,
          and you replace the real service with an empty object.
          This is because you don't intend to invoke any method
          on it. */
      providers: [{ provide: WeatherService, useValue: {} }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    /*  Creates an instance of WeatherComponent, and gets a
    ComponentFixture back */
    fixture = TestBed.createComponent(WeatherComponent);
    /*  Fixture has a reference to the WeatherComponent */
    component = fixture.componentInstance;
    /* Initiates change detection */
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 
});

