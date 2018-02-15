import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temperature-pipe',
  template: `<div class=main>
    <h2>Temperature pipe demo</h2>

    <mat-form-field>
      <input matInput type='text' value="0"
        placeholder= "Enter temperature" [(ngModel)] = "temp">
    </mat-form-field>

    <button mat-raised-button (click)="toggleFormat()">Toggle Format</button>

    <h3>In {{targetFormat}} this temperature is
    {{temp | temperature: format | number:'1.1-2'}}
    </h3>
  </div>
  `,
  styles: []
})
export class TemperaturePipeComponent implements OnInit {
  temp: number;
  toCelsius: boolean;
  targetFormat: string;
  format: string;

  constructor() { }

  ngOnInit() {
    this.toCelsius = true;
    this.targetFormat = 'Celsius';
    this.format = 'FtoC';
  }

  toggleFormat() {

    this.toCelsius = !this.toCelsius;
    this.format = this.toCelsius ? 'FtoC' : 'CtoF';

    this.targetFormat = this.toCelsius ? 'Celsius' : 'Fahrenheit';
  }

}
